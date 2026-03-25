import { Injectable, NotFoundException, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Response } from 'express';
import PDFDocument from 'pdfkit';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async create(createOrderDto: CreateOrderDto) {
    // This method would typically be called internally after checkout
    // For now, we'll throw an error since orders should be created through checkout
    throw new Error('Orders should be created through checkout process, not directly');
  }

  async findAll(userId: number, isAdmin: boolean = false) {
    // If user is admin, return all orders
    // If user is not admin, return only their orders
    const whereClause: any = {};

    if (!isAdmin) {
      whereClause.customer_id = userId;
    }

    const orders = await this.prisma.orders.findMany({
      where: whereClause,
      include: {
        order_products: {
          include: {
            products: {
              include: {
                product_translations: {
                  where: { locale: 'en' },
                  take: 1
                }
              }
            }
          }
        },
        transactions: true
      },
      orderBy: {
        created_at: 'desc'
      }
    });

    return orders.map(order => ({
      id: order.id,
      customerId: order.customer_id,
      customerEmail: order.customer_email,
      customerName: `${order.customer_first_name} ${order.customer_last_name}`,
      status: order.status,
      total: order.total,
      paymentMethod: order.payment_method,
      currency: order.currency,
      createdAt: order.created_at,
      updatedAt: order.updated_at,
      trackingReference: order.tracking_reference,
      note: order.note,
      products: order.order_products.map(op => ({
        id: op.id,
        productId: op.product_id,
        productName: op.products?.product_translations[0]?.name || 'Unknown Product',
        unitPrice: op.unit_price,
        quantity: op.qty,
        lineTotal: op.line_total,
      })),
      transaction: Array.isArray(order.transactions) && order.transactions.length > 0 ? order.transactions[0] : null
    }));
  }

  async findOne(id: number, userId: number, isAdmin: boolean = false) {
    // If user is admin, allow access to any order
    // If user is not admin, only allow access to their own orders
    const whereClause: any = { id };

    if (!isAdmin) {
      whereClause.customer_id = userId;
    }

    const order = await this.prisma.orders.findFirst({
      where: whereClause,
      include: {
        order_products: {
          include: {
            products: {
              include: {
                product_translations: {
                  where: { locale: 'en' },
                  take: 1
                }
              }
            }
          }
        },
        transactions: true
      }
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    return {
      id: order.id,
      customerId: order.customer_id,
      customerEmail: order.customer_email,
      customerPhone: order.customer_phone,
      customerName: `${order.customer_first_name} ${order.customer_last_name}`,
      billingAddress: {
        firstName: order.billing_first_name,
        lastName: order.billing_last_name,
        address1: order.billing_address_1,
        address2: order.billing_address_2,
        city: order.billing_city,
        state: order.billing_state,
        zip: order.billing_zip,
        country: order.billing_country,
      },
      shippingAddress: {
        firstName: order.shipping_first_name,
        lastName: order.shipping_last_name,
        address1: order.shipping_address_1,
        address2: order.shipping_address_2,
        city: order.shipping_city,
        state: order.shipping_state,
        zip: order.shipping_zip,
        country: order.shipping_country,
      },
      subTotal: order.sub_total,
      shippingMethod: order.shipping_method,
      shippingCost: order.shipping_cost,
      discount: order.discount,
      total: order.total,
      paymentMethod: order.payment_method,
      currency: order.currency,
      currencyRate: order.currency_rate,
      locale: order.locale,
      status: order.status,
      note: order.note,
      trackingReference: order.tracking_reference,
      createdAt: order.created_at,
      updatedAt: order.updated_at,
      products: order.order_products.map(op => ({
        id: op.id,
        productId: op.product_id,
        productName: op.products?.product_translations[0]?.name || 'Unknown Product',
        unitPrice: op.unit_price,
        quantity: op.qty,
        lineTotal: op.line_total,
      })),
      transaction: order.transactions || null
    };
  }

  async update(id: number, updateOrderDto: UpdateOrderDto, userId: number, isAdmin: boolean = false) {
    // Only admins can update orders
    if (!isAdmin) {
      throw new UnauthorizedException('Only admins can update orders');
    }

    // Get the existing order to check if it exists
    const existingOrder = await this.prisma.orders.findUnique({
      where: { id }
    });

    if (!existingOrder) {
      throw new NotFoundException('Order not found');
    }

    // Update the order
    const updatedOrder = await this.prisma.orders.update({
      where: { id },
      data: {
        ...updateOrderDto,
        updated_at: new Date(),
      },
    });

    return {
      message: 'Order updated successfully',
      order: updatedOrder
    };
  }

  async remove(id: number, userId: number, isAdmin: boolean = false) {
    // Only admins can delete orders
    if (!isAdmin) {
      throw new UnauthorizedException('Only admins can delete orders');
    }

    // Check if order exists
    const existingOrder = await this.prisma.orders.findUnique({
      where: { id }
    });

    if (!existingOrder) {
      throw new NotFoundException('Order not found');
    }

    // Delete related records first (due to foreign key constraints)
    await this.prisma.order_products.deleteMany({
      where: { order_id: id }
    });

    // Delete the order
    await this.prisma.orders.delete({
      where: { id }
    });

    return { message: 'Order deleted successfully' };
  }

  // Get orders by status
  async findByStatus(status: string, userId: number, isAdmin: boolean = false) {
    if (!isAdmin) {
      throw new UnauthorizedException('Only admins can view orders by status');
    }

    const orders = await this.prisma.orders.findMany({
      where: {
        status
      },
      include: {
        order_products: {
          include: {
            products: {
              include: {
                product_translations: {
                  where: { locale: 'en' },
                  take: 1
                }
              }
            }
          }
        }
      },
      orderBy: {
        created_at: 'desc'
      }
    });

    return orders.map(order => ({
      id: order.id,
      customerId: order.customer_id,
      customerEmail: order.customer_email,
      customerName: `${order.customer_first_name} ${order.customer_last_name}`,
      status: order.status,
      total: order.total,
      paymentMethod: order.payment_method,
      currency: order.currency,
      createdAt: order.created_at,
      updatedAt: order.updated_at,
      products: order.order_products.map(op => ({
        id: op.id,
        productId: op.product_id,
        productName: op.products?.product_translations[0]?.name || 'Unknown Product',
        unitPrice: op.unit_price,
        quantity: op.qty,
        lineTotal: op.line_total,
      }))
    }));
  }

  // Get user's order history
  async getUserOrderHistory(userId: number) {
    // Get orders from the database
    const dbOrders = await this.prisma.orders.findMany({
      where: {
        customer_id: userId
      },
      include: {
        order_products: {
          include: {
            products: {
              include: {
                product_translations: {
                  where: { locale: 'en' },
                  take: 1
                }
              }
            }
          }
        }
      },
      orderBy: {
        created_at: 'desc'
      }
    });

    const dbOrdersFormatted = dbOrders.map(order => ({
      id: order.id,
      customerId: order.customer_id,
      customerEmail: order.customer_email,
      customerPhone: order.customer_phone,
      customerName: `${order.customer_first_name} ${order.customer_last_name}`,
      billingAddress: {
        firstName: order.billing_first_name,
        lastName: order.billing_last_name,
        address1: order.billing_address_1,
        address2: order.billing_address_2,
        city: order.billing_city,
        state: order.billing_state,
        zip: order.billing_zip,
        country: order.billing_country,
      },
      shippingAddress: {
        firstName: order.shipping_first_name,
        lastName: order.shipping_last_name,
        address1: order.shipping_address_1,
        address2: order.shipping_address_2,
        city: order.shipping_city,
        state: order.shipping_state,
        zip: order.shipping_zip,
        country: order.shipping_country,
      },
      subTotal: order.sub_total,
      shippingMethod: order.shipping_method,
      shippingCost: order.shipping_cost,
      discount: order.discount,
      total: order.total,
      paymentMethod: order.payment_method,
      currency: order.currency,
      currencyRate: order.currency_rate,
      locale: order.locale,
      status: order.status,
      note: order.note,
      trackingReference: order.tracking_reference,
      createdAt: order.created_at,
      updatedAt: order.updated_at,
      products: order.order_products.map(op => ({
        id: op.id,
        productId: op.product_id,
        productName: op.products?.product_translations[0]?.name || 'Unknown Product',
        unitPrice: op.unit_price,
        quantity: op.qty,
        lineTotal: op.line_total,
      })),
      transaction: null  // For now, set to null since we're not including transactions in this query
    }));

    // Add static orders for demonstration purposes if no orders exist in DB
    if (dbOrdersFormatted.length === 0) {
      const staticOrders = [
        {
          id: 10535700,
          customerId: userId,
          customerEmail: 'user@example.com',
          customerName: 'John Doe',
          status: 'Processing',
          total: 47.28,
          paymentMethod: 'Credit Card',
          currency: 'GBP',
          createdAt: new Date('2025-12-08'),
          updatedAt: new Date('2025-12-08'),
          trackingReference: 'TRK123456789',
          products: [
            {
              id: 1,
              productId: 1,
              productName: 'Uniznik - zinc aspartat...',
              unitPrice: 47.28,
              quantity: 1,
              lineTotal: 47.28,
            }
          ],
          billingAddress: {
            firstName: 'John',
            lastName: 'Doe',
            address1: '123 Main St',
            address2: '',
            city: 'London',
            state: 'England',
            zip: 'SW1A 1AA',
            country: 'UK',
          },
          shippingAddress: {
            firstName: 'John',
            lastName: 'Doe',
            address1: '123 Main St',
            address2: '',
            city: 'London',
            state: 'England',
            zip: 'SW1A 1AA',
            country: 'UK',
          },
          subTotal: 47.28,
          shippingCost: 0,
          discount: 0,
          currencyRate: 1,
          locale: 'en',
          note: 'Standard order',
          transaction: null
        },
        {
          id: 10531425,
          customerId: userId,
          customerEmail: 'user@example.com',
          customerName: 'John Doe',
          status: 'Shipped',
          total: 118.20,
          paymentMethod: 'PayPal',
          currency: 'GBP',
          createdAt: new Date('2025-11-26'),
          updatedAt: new Date('2025-11-26'),
          trackingReference: 'TRK987654321',
          products: [
            {
              id: 2,
              productId: 2,
              productName: 'Uniznik - zinc aspartat...',
              unitPrice: 118.20,
              quantity: 1,
              lineTotal: 118.20,
            }
          ],
          billingAddress: {
            firstName: 'John',
            lastName: 'Doe',
            address1: '123 Main St',
            address2: '',
            city: 'London',
            state: 'England',
            zip: 'SW1A 1AA',
            country: 'UK',
          },
          shippingAddress: {
            firstName: 'John',
            lastName: 'Doe',
            address1: '123 Main St',
            address2: '',
            city: 'London',
            state: 'England',
            zip: 'SW1A 1AA',
            country: 'UK',
          },
          subTotal: 118.20,
          shippingCost: 0,
          discount: 0,
          currencyRate: 1,
          locale: 'en',
          note: 'Express shipping',
          transaction: null
        }
      ];
      return staticOrders;
    }

    return dbOrdersFormatted;
  }

  // Update order status (for admin use)
  async updateOrderStatus(orderId: number, status: string, adminId: number) {
    // Verify admin privileges
    const adminRoles = await this.prisma.user_roles.findMany({
      where: { user_id: adminId },
      include: {
        roles: true
      }
    });

    const isAdmin = adminRoles.some(ur =>
      ur.roles.permissions?.includes('admin') ||
      ur.roles.permissions?.includes('superadmin')
    );

    if (!isAdmin) {
      throw new UnauthorizedException('Only admins can update order status');
    }

    const existingOrder = await this.prisma.orders.findUnique({
      where: { id: orderId }
    });

    if (!existingOrder) {
      throw new NotFoundException('Order not found');
    }

    const updatedOrder = await this.prisma.orders.update({
      where: { id: orderId },
      data: {
        status,
        updated_at: new Date(),
      }
    });

    return {
      message: 'Order status updated successfully',
      order: updatedOrder
    };
  }

  // Download invoice PDF
  async downloadInvoice(orderId: number, userId: number, isAdmin: boolean, res: Response) {
    // If user is admin, allow access to any order
    // If user is not admin, only allow access to their own orders
    const whereClause: any = { id: orderId };

    if (!isAdmin) {
      whereClause.customer_id = userId;
    }

    const order = await this.prisma.orders.findFirst({
      where: whereClause,
      include: {
        order_products: {
          include: {
            products: {
              include: {
                product_translations: {
                  where: { locale: 'en' },
                  take: 1
                }
              }
            }
          }
        }
      }
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    // Create PDF document
    const doc = new PDFDocument({ margin: 50 });
    
    // Set response headers
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="invoice-order-${orderId}.pdf"`);
    
    // Pipe PDF to response
    doc.pipe(res);

    // Header - Company Info
    doc.fontSize(20).text('HALO DIRECT', { align: 'center' });
    doc.fontSize(10).text('UK Drug Shortages Platform', { align: 'center' });
    doc.text('Invoice', { align: 'center' });
    doc.moveDown(1);

    // Invoice Details
    doc.fontSize(12).text(`Invoice Number: INV-${order.id}`, { align: 'right' });
    doc.text(`Order Number: #${order.id}`, { align: 'right' });
    const orderDate = order.created_at ? new Date(order.created_at) : new Date();
    doc.text(`Date: ${orderDate.toLocaleDateString('en-GB')}`, { align: 'right' });
    doc.moveDown(2);

    // Customer Information
    doc.fontSize(14).text('Customer Information', { underline: true });
    doc.fontSize(11);
    doc.text(`Name: ${order.customer_first_name} ${order.customer_last_name}`);
    doc.text(`Email: ${order.customer_email}`);
    if (order.customer_phone) {
      doc.text(`Phone: ${order.customer_phone}`);
    }
    doc.moveDown(1);

    // Shipping Address
    doc.fontSize(14).text('Shipping Address', { underline: true });
    doc.fontSize(11);
    doc.text(`${order.shipping_first_name} ${order.shipping_last_name}`);
    doc.text(order.shipping_address_1);
    if (order.shipping_address_2) {
      doc.text(order.shipping_address_2);
    }
    doc.text(`${order.shipping_city}, ${order.shipping_state} ${order.shipping_zip}`);
    doc.text(order.shipping_country);
    doc.moveDown(3);

    // Products Table Header
    const tableTop = doc.y + 20;
    const tableLeft = 50;
    
    doc.fontSize(10);
    doc.font('Helvetica-Bold');
    doc.text('Product', tableLeft, tableTop);
    doc.text('Unit Price', 250, tableTop);
    doc.text('Quantity', 350, tableTop);
    doc.text('Total', 450, tableTop);
    
    doc.moveTo(50, tableTop + 15).lineTo(550, tableTop + 15).stroke();
    
    // Products Table Rows
    let rowPosition = tableTop + 30;
    doc.font('Helvetica');
    
    order.order_products.forEach((product) => {
      const productName = product.products?.product_translations[0]?.name || 'Unknown Product';
      
      doc.fontSize(10);
      doc.text(productName, tableLeft, rowPosition, { width: 180, align: 'left' });
      doc.text(`£${product.unit_price.toFixed(2)}`, 250, rowPosition);
      doc.text(product.qty.toString(), 350, rowPosition);
      doc.text(`£${product.line_total.toFixed(2)}`, 450, rowPosition);
      
      rowPosition += 25;
    });

    // Totals
    const totalsTop = rowPosition + 20;
    doc.moveTo(50, totalsTop - 10).lineTo(550, totalsTop - 10).stroke();
    
    doc.font('Helvetica');
    doc.text('Subtotal:', 350, totalsTop);
    doc.text(`£${order.sub_total.toFixed(2)}`, 450, totalsTop);
    
    doc.text('Shipping:', 350, totalsTop + 20);
    doc.text(`£${order.shipping_cost.toFixed(2)}`, 450, totalsTop + 20);
    
    if (Number(order.discount) > 0) {
      doc.text('Discount:', 350, totalsTop + 40);
      doc.text(`-£${Number(order.discount).toFixed(2)}`, 450, totalsTop + 40);
    }
    
    doc.font('Helvetica-Bold');
    doc.fontSize(12);
    doc.text('Total:', 350, totalsTop + 60);
    doc.text(`£${order.total.toFixed(2)}`, 450, totalsTop + 60);
    
    doc.moveDown(3);

    // Footer
    doc.fontSize(10);
    doc.font('Helvetica');
    doc.text('Thank you for your business!', { align: 'center' });
    doc.text('For any queries, please contact us at support@halodirect.com', { align: 'center' });
    
    // Finalize PDF
    doc.end();
  }
}
