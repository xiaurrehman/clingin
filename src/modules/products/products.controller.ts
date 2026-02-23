import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  Request,
  BadRequestException
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { SearchProductsDto } from './dto/search-products.dto';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { CheckoutDto } from './dto/checkout.dto';
import { BookmarkProductDto } from './dto/bookmark-product.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // Admin endpoints (would typically be protected)
  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    const productId = parseInt(id, 10);

    if (isNaN(productId) || productId <= 0) {
      throw new BadRequestException('Invalid product ID');
    }

    return this.productsService.update(productId, updateProductDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    const productId = parseInt(id, 10);

    if (isNaN(productId) || productId <= 0) {
      throw new BadRequestException('Invalid product ID');
    }

    return this.productsService.remove(productId);
  }

  // Public endpoints
  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  // Product search endpoint
  @Get('search')
  search(@Query() searchDto: SearchProductsDto) {
    return this.productsService.searchProducts(searchDto);
  }

  // Cart management endpoints (user must be authenticated)
  @Get('cart')
  @UseGuards(JwtAuthGuard)
  getCart(@Request() req) {
    const userId = parseInt(req.user.userId || req.user.sub);

    if (isNaN(userId) || userId <= 0) {
      throw new BadRequestException('Invalid user ID');
    }

    return this.productsService.getCart(userId);
  }

  @Post('cart/add')
  @UseGuards(JwtAuthGuard)
  addToCart(@Request() req, @Body() addToCartDto: AddToCartDto) {
    const userId = parseInt(req.user.userId || req.user.sub);

    if (isNaN(userId) || userId <= 0) {
      throw new BadRequestException('Invalid user ID');
    }

    return this.productsService.addToCart(userId, addToCartDto);
  }

  @Patch('cart/update/:productId')
  @UseGuards(JwtAuthGuard)
  updateCartItem(
    @Request() req,
    @Param('productId') productId: string,
    @Body() updateCartItemDto: UpdateCartItemDto
  ) {
    const userId = parseInt(req.user.userId || req.user.sub);
    const parsedProductId = parseInt(productId, 10);

    if (isNaN(userId) || userId <= 0) {
      throw new BadRequestException('Invalid user ID');
    }
    if (isNaN(parsedProductId) || parsedProductId <= 0) {
      throw new BadRequestException('Invalid product ID');
    }

    return this.productsService.updateCartItem(
      userId,
      parsedProductId,
      updateCartItemDto
    );
  }

  @Delete('cart/remove/:productId')
  @UseGuards(JwtAuthGuard)
  removeFromCart(@Request() req, @Param('productId') productId: string) {
    const userId = parseInt(req.user.userId || req.user.sub);
    const parsedProductId = parseInt(productId, 10);

    if (isNaN(userId) || userId <= 0) {
      throw new BadRequestException('Invalid user ID');
    }
    if (isNaN(parsedProductId) || parsedProductId <= 0) {
      throw new BadRequestException('Invalid product ID');
    }

    return this.productsService.removeFromCart(userId, parsedProductId);
  }

  @Post('cart/clear')
  @UseGuards(JwtAuthGuard)
  clearCart(@Request() req) {
    const userId = parseInt(req.user.userId || req.user.sub);

    if (isNaN(userId) || userId <= 0) {
      throw new BadRequestException('Invalid user ID');
    }

    return this.productsService.clearCart(userId);
  }

  // Checkout endpoint (user must be authenticated)
  @Post('checkout')
  @UseGuards(JwtAuthGuard)
  checkout(@Request() req, @Body() checkoutDto: CheckoutDto) {
    const userId = parseInt(req.user.userId || req.user.sub);

    if (isNaN(userId) || userId <= 0) {
      throw new BadRequestException('Invalid user ID');
    }

    return this.productsService.checkout(userId, checkoutDto);
  }

  // Bookmark/Wishlist endpoints (user must be authenticated)
  @Post('bookmark')
  @UseGuards(JwtAuthGuard)
  addBookmark(@Request() req, @Body() bookmarkDto: BookmarkProductDto) {
    const userId = parseInt(req.user.userId || req.user.sub);

    if (isNaN(userId) || userId <= 0) {
      throw new BadRequestException('Invalid user ID');
    }

    return this.productsService.addBookmark(userId, bookmarkDto.productId);
  }

  @Delete('bookmark/:productId')
  @UseGuards(JwtAuthGuard)
  removeBookmark(@Request() req, @Param('productId') productId: string) {
    const userId = parseInt(req.user.userId || req.user.sub);
    const parsedProductId = parseInt(productId, 10);

    if (isNaN(userId) || userId <= 0) {
      throw new BadRequestException('Invalid user ID');
    }
    if (isNaN(parsedProductId) || parsedProductId <= 0) {
      throw new BadRequestException('Invalid product ID');
    }

    return this.productsService.removeBookmark(userId, parsedProductId);
  }

  @Get('bookmarks')
  @UseGuards(JwtAuthGuard)
  getUserBookmarks(@Request() req) {
    const userId = parseInt(req.user.userId || req.user.sub);

    if (isNaN(userId) || userId <= 0) {
      throw new BadRequestException('Invalid user ID');
    }

    return this.productsService.getUserBookmarks(userId);
  }

  // Get product by slug (for SEO-friendly URLs) - MUST be before :id/is-bookmarked
  @Get(':slug')
  findOneBySlug(@Param('slug') slug: string) {
    return this.productsService.findBySlug(slug);
  }

  @Get(':id/is-bookmarked')
  @UseGuards(JwtAuthGuard)
  isBookmarked(@Request() req, @Param('id') productId: string) {
    const userId = parseInt(req.user.userId || req.user.sub);
    const parsedProductId = parseInt(productId, 10);

    if (isNaN(userId) || userId <= 0) {
      throw new BadRequestException('Invalid user ID');
    }
    if (isNaN(parsedProductId) || parsedProductId <= 0) {
      throw new BadRequestException('Invalid product ID');
    }

    return this.productsService.isBookmarked(userId, parsedProductId);
  }
}


