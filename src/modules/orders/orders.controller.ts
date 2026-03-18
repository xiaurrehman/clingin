import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Query,
  Res,
  Header
} from '@nestjs/common';
import { Response } from 'express';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { AuthService } from '../auth/auth.service';

@Controller('orders')
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
    private readonly authService: AuthService,
  ) {}

  // Admin endpoint to create an order (not typically used since orders are created via checkout)
  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Request() req, @Body() createOrderDto: CreateOrderDto) {
    // Check if user is admin
    const isAdmin = await this.authService.isAdmin(req.user.sub);
    if (!isAdmin) {
      throw new Error('Orders should be created through checkout process, not directly');
    }
    return this.ordersService.create(createOrderDto);
  }

  // Get all orders (admin only) or user's orders
  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(@Request() req) {
    const userId = req.user.sub;
    const isAdmin = await this.authService.isAdmin(userId);
    return this.ordersService.findAll(userId, isAdmin);
  }

  // Get orders by status (admin only)
  @Get('status/:status')
  @UseGuards(JwtAuthGuard)
  async findByStatus(@Param('status') status: string, @Request() req) {
    const userId = req.user.sub;
    const isAdmin = await this.authService.isAdmin(userId);
    if (!isAdmin) {
      throw new Error('Only admins can view orders by status');
    }
    return this.ordersService.findByStatus(status, userId, isAdmin);
  }

  // Get user's order history
  @Get('history')
  @UseGuards(JwtAuthGuard)
  async getUserOrderHistory(@Request() req) {
    const userId = req.user.sub;
    return this.ordersService.getUserOrderHistory(userId);
  }

  // Get specific order
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string, @Request() req) {
    const userId = req.user.sub;
    const isAdmin = await this.authService.isAdmin(userId);
    return this.ordersService.findOne(+id, userId, isAdmin);
  }

  // Update order (admin only)
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto, @Request() req) {
    const userId = req.user.sub;
    const isAdmin = await this.authService.isAdmin(userId);
    return this.ordersService.update(+id, updateOrderDto, userId, isAdmin);
  }

  // Update order status (admin only)
  @Patch(':id/status')
  @UseGuards(JwtAuthGuard)
  async updateOrderStatus(
    @Param('id') id: string,
    @Body() updateOrderStatusDto: UpdateOrderStatusDto,
    @Request() req
  ) {
    const adminId = req.user.sub;
    const isAdmin = await this.authService.isAdmin(adminId);
    if (!isAdmin) {
      throw new Error('Only admins can update order status');
    }
    return this.ordersService.updateOrderStatus(+id, updateOrderStatusDto.status, adminId);
  }

  // Delete order (admin only)
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string, @Request() req) {
    const userId = req.user.sub;
    const isAdmin = await this.authService.isAdmin(userId);
    return this.ordersService.remove(+id, userId, isAdmin);
  }

  // Download invoice PDF
  @Get(':id/invoice')
  @UseGuards(JwtAuthGuard)
  @Header('Content-Type', 'application/pdf')
  @Header('Content-Disposition', 'attachment; filename="invoice.pdf"')
  async downloadInvoice(@Param('id') id: string, @Request() req, @Res() res: Response) {
    const userId = req.user.sub;
    const isAdmin = await this.authService.isAdmin(userId);
    return this.ordersService.downloadInvoice(+id, userId, isAdmin, res);
  }
}
