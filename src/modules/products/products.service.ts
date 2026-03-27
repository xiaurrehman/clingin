import { Injectable, BadRequestException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { SearchProductsDto } from './dto/search-products.dto';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { CheckoutDto } from './dto/checkout.dto';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class ProductsService {
  constructor(
    private prisma: PrismaService,
    private mailService: MailService,
  ) {}

  async create(createProductDto: CreateProductDto) {
    // Implementation for creating a product
    // This would typically be for admin use
    throw new Error('Admin functionality not implemented in this scope');
  }

  async findAll() {
    return await this.prisma.products.findMany({
      where: { is_active: true },
      include: {
        product_translations: {
          where: { locale: 'en' }, // Default to English
          take: 1
        },
        product_categories: {
          include: {
            categories: true
          }
        },
        product_variants: true,
        product_variations: {
          include: {
            variations: true
          }
        },
        product_options: {
          include: {
            options: {
              include: {
                option_translations: {
                  where: { locale: 'en' },
                  take: 1
                }
              }
            }
          }
        },
        product_attributes: {
          include: {
            attributes: {
              include: {
                attribute_translations: {
                  where: { locale: 'en' },
                  take: 1
                }
              }
            }
          }
        },
        product_tags: {
          include: {
            tags: {
              include: {
                tag_translations: {
                  where: { locale: 'en' },
                  take: 1
                }
              }
            }
          }
        },
        brands: true,
        // Related products (alternatives)
        related_products_related_products_product_idToproducts: {
          include: {
            products_related_products_related_product_idToproducts: {
              include: {
                product_translations: {
                  where: { locale: 'en' },
                  take: 1
                }
              }
            }
          }
        },
        related_products_related_products_related_product_idToproducts: {
          include: {
            products_related_products_product_idToproducts: {
              include: {
                product_translations: {
                  where: { locale: 'en' },
                  take: 1
                }
              }
            }
          }
        },
        // Up-sell products
        up_sell_products_up_sell_products_product_idToproducts: {
          include: {
            products_up_sell_products_up_sell_product_idToproducts: {
              include: {
                product_translations: {
                  where: { locale: 'en' },
                  take: 1
                }
              }
            }
          }
        },
        up_sell_products_up_sell_products_up_sell_product_idToproducts: {
          include: {
            products_up_sell_products_product_idToproducts: {
              include: {
                product_translations: {
                  where: { locale: 'en' },
                  take: 1
                }
              }
            }
          }
        },
        // Cross-sell products
        cross_sell_products_cross_sell_products_product_idToproducts: {
          include: {
            products_cross_sell_products_cross_sell_product_idToproducts: {
              include: {
                product_translations: {
                  where: { locale: 'en' },
                  take: 1
                }
              }
            }
          }
        },
        cross_sell_products_cross_sell_products_cross_sell_product_idToproducts: {
          include: {
            products_cross_sell_products_product_idToproducts: {
              include: {
                product_translations: {
                  where: { locale: 'en' },
                  take: 1
                }
              }
            }
          }
        },
        // Shortage alternatives
        shortage_alternatives_shortage_alternatives_product_idToproducts: {
          include: {
            products_shortage_alternatives_alternative_product_idToproducts: {
              include: {
                product_translations: {
                  where: { locale: 'en' },
                  take: 1
                }
              }
            }
          }
        },
        shortage_alternatives_shortage_alternatives_alternative_product_idToproducts: {
          include: {
            products_shortage_alternatives_product_idToproducts: {
              include: {
                product_translations: {
                  where: { locale: 'en' },
                  take: 1
                }
              }
            }
          }
        },
      }
    });
  }

  async findOne(id: number) {
    // Additional validation to ensure id is a valid positive integer
    if (isNaN(id) || id <= 0 || !Number.isInteger(id)) {
      throw new BadRequestException('Invalid product ID');
    }

    const product = await this.prisma.products.findUnique({
      where: { id },
      include: {
        product_translations: {
          where: { locale: 'en' }, // Default to English
          take: 1
        },
        product_categories: {
          include: {
            categories: true
          }
        },
        product_variants: true,
        product_variations: {
          include: {
            variations: true
          }
        },
        product_options: {
          include: {
            options: {
              include: {
                option_translations: {
                  where: { locale: 'en' },
                  take: 1
                }
              }
            }
          }
        },
        product_attributes: {
          include: {
            attributes: {
              include: {
                attribute_translations: {
                  where: { locale: 'en' },
                  take: 1
                }
              }
            }
          }
        },
        product_tags: {
          include: {
            tags: {
              include: {
                tag_translations: {
                  where: { locale: 'en' },
                  take: 1
                }
              }
            }
          }
        },
        brands: true,
        // Related products (alternatives)
        related_products_related_products_product_idToproducts: {
          include: {
            products_related_products_related_product_idToproducts: {
              include: {
                product_translations: {
                  where: { locale: 'en' },
                  take: 1
                }
              }
            }
          }
        },
        related_products_related_products_related_product_idToproducts: {
          include: {
            products_related_products_product_idToproducts: {
              include: {
                product_translations: {
                  where: { locale: 'en' },
                  take: 1
                }
              }
            }
          }
        },
        // Up-sell products
        up_sell_products_up_sell_products_product_idToproducts: {
          include: {
            products_up_sell_products_up_sell_product_idToproducts: {
              include: {
                product_translations: {
                  where: { locale: 'en' },
                  take: 1
                }
              }
            }
          }
        },
        up_sell_products_up_sell_products_up_sell_product_idToproducts: {
          include: {
            products_up_sell_products_product_idToproducts: {
              include: {
                product_translations: {
                  where: { locale: 'en' },
                  take: 1
                }
              }
            }
          }
        },
        // Cross-sell products
        cross_sell_products_cross_sell_products_product_idToproducts: {
          include: {
            products_cross_sell_products_cross_sell_product_idToproducts: {
              include: {
                product_translations: {
                  where: { locale: 'en' },
                  take: 1
                }
              }
            }
          }
        },
        cross_sell_products_cross_sell_products_cross_sell_product_idToproducts: {
          include: {
            products_cross_sell_products_product_idToproducts: {
              include: {
                product_translations: {
                  where: { locale: 'en' },
                  take: 1
                }
              }
            }
          }
        },
        // Shortage alternatives
        shortage_alternatives_shortage_alternatives_product_idToproducts: {
          include: {
            products_shortage_alternatives_alternative_product_idToproducts: {
              include: {
                product_translations: {
                  where: { locale: 'en' },
                  take: 1
                }
              }
            }
          }
        },
        shortage_alternatives_shortage_alternatives_alternative_product_idToproducts: {
          include: {
            products_shortage_alternatives_product_idToproducts: {
              include: {
                product_translations: {
                  where: { locale: 'en' },
                  take: 1
                }
              }
            }
          }
        },
      }
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  async findBySlug(slug: string) {
    if (!slug || typeof slug !== 'string') {
      throw new BadRequestException('Invalid product slug');
    }

    const product = await this.prisma.products.findUnique({
      where: { slug },
      include: {
        product_translations: {
          where: { locale: 'en' }, // Default to English
          take: 1
        },
        product_categories: {
          include: {
            categories: true
          }
        },
        product_variants: true,
        product_variations: {
          include: {
            variations: true
          }
        },
        product_options: {
          include: {
            options: {
              include: {
                option_translations: {
                  where: { locale: 'en' },
                  take: 1
                }
              }
            }
          }
        },
        product_attributes: {
          include: {
            attributes: {
              include: {
                attribute_translations: {
                  where: { locale: 'en' },
                  take: 1
                }
              }
            }
          }
        },
        product_tags: {
          include: {
            tags: {
              include: {
                tag_translations: {
                  where: { locale: 'en' },
                  take: 1
                }
              }
            }
          }
        },
        brands: true,
        // Related products (alternatives)
        related_products_related_products_product_idToproducts: {
          include: {
            products_related_products_related_product_idToproducts: {
              include: {
                product_translations: {
                  where: { locale: 'en' },
                  take: 1
                }
              }
            }
          }
        },
        related_products_related_products_related_product_idToproducts: {
          include: {
            products_related_products_product_idToproducts: {
              include: {
                product_translations: {
                  where: { locale: 'en' },
                  take: 1
                }
              }
            }
          }
        },
        // Up-sell products
        up_sell_products_up_sell_products_product_idToproducts: {
          include: {
            products_up_sell_products_up_sell_product_idToproducts: {
              include: {
                product_translations: {
                  where: { locale: 'en' },
                  take: 1
                }
              }
            }
          }
        },
        up_sell_products_up_sell_products_up_sell_product_idToproducts: {
          include: {
            products_up_sell_products_product_idToproducts: {
              include: {
                product_translations: {
                  where: { locale: 'en' },
                  take: 1
                }
              }
            }
          }
        },
        // Cross-sell products
        cross_sell_products_cross_sell_products_product_idToproducts: {
          include: {
            products_cross_sell_products_cross_sell_product_idToproducts: {
              include: {
                product_translations: {
                  where: { locale: 'en' },
                  take: 1
                }
              }
            }
          }
        },
        cross_sell_products_cross_sell_products_cross_sell_product_idToproducts: {
          include: {
            products_cross_sell_products_product_idToproducts: {
              include: {
                product_translations: {
                  where: { locale: 'en' },
                  take: 1
                }
              }
            }
          }
        },
        // Shortage alternatives
        shortage_alternatives_shortage_alternatives_product_idToproducts: {
          include: {
            products_shortage_alternatives_alternative_product_idToproducts: {
              include: {
                product_translations: {
                  where: { locale: 'en' },
                  take: 1
                }
              }
            }
          }
        },
        shortage_alternatives_shortage_alternatives_alternative_product_idToproducts: {
          include: {
            products_shortage_alternatives_product_idToproducts: {
              include: {
                product_translations: {
                  where: { locale: 'en' },
                  take: 1
                }
              }
            }
          }
        },
      }
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    // Validation to ensure id is a valid positive integer
    if (isNaN(id) || id <= 0 || !Number.isInteger(id)) {
      throw new BadRequestException('Invalid product ID');
    }

    // Implementation for updating a product
    // This would typically be for admin use
    throw new Error('Admin functionality not implemented in this scope');
  }

  async remove(id: number) {
    // Validation to ensure id is a valid positive integer
    if (isNaN(id) || id <= 0 || !Number.isInteger(id)) {
      throw new BadRequestException('Invalid product ID');
    }

    // Implementation for removing a product
    // This would typically be for admin use
    throw new Error('Admin functionality not implemented in this scope');
  }

  // Product Search Functionality
  async searchProducts(searchDto: SearchProductsDto) {
    try {
      const {
        q,
        category,
        minPrice,
        maxPrice,
        is_shortage,
        page = 1,
        limit = 10,
        sortBy = 'created_at',
        sortOrder = 'desc'
      } = searchDto;

      // Build where clause
      const whereClause: any = {
        is_active: true,
      };

      // Add search query condition - MySQL compatible approach
      if (q) {
        // For MySQL, we use contains which does case-insensitive search by default in most collations
        whereClause.OR = [
          {
            product_translations: {
              some: {
                name: { contains: q },
              },
            },
          },
          {
            product_translations: {
              some: {
                description: { contains: q },
              },
            },
          },
          {
            slug: { contains: q },
          },
        ];
      }

      // Add category condition
      if (category) {
        whereClause.product_categories = {
          some: {
            categories: {
              slug: { equals: category }
            }
          }
        };
      }

      // Add shortage filter
      if (is_shortage !== undefined) {
        whereClause.is_shortage = is_shortage;
      }

      // Add price range condition
      if (minPrice !== undefined) {
        whereClause.price = {
          gte: minPrice,
        };
      }
      if (maxPrice !== undefined) {
        if (whereClause.price) {
          whereClause.price.lte = maxPrice;
        } else {
          whereClause.price = { lte: maxPrice };
        }
      }

      // Calculate pagination
      const skip = (page - 1) * limit;

      // Build include clause for all product data
      const includeClause: any = {
        product_translations: {
          where: { locale: 'en' },
          take: 1
        },
        product_categories: {
          include: {
            categories: true
          }
        },
        product_variants: true,
        product_variations: {
          include: {
            variations: true
          }
        },
        product_options: {
          include: {
            options: {
              include: {
                option_translations: {
                  where: { locale: 'en' },
                  take: 1
                }
              }
            }
          }
        },
        product_attributes: {
          include: {
            attributes: {
              include: {
                attribute_translations: {
                  where: { locale: 'en' },
                  take: 1
                }
              }
            }
          }
        },
        product_tags: {
          include: {
            tags: {
              include: {
                tag_translations: {
                  where: { locale: 'en' },
                  take: 1
                }
              }
            }
          }
        },
        brands: true,
        // Related products (alternatives)
        related_products_related_products_product_idToproducts: {
          include: {
            products_related_products_related_product_idToproducts: {
              include: {
                product_translations: {
                  where: { locale: 'en' },
                  take: 1
                }
              }
            }
          }
        },
        related_products_related_products_related_product_idToproducts: {
          include: {
            products_related_products_product_idToproducts: {
              include: {
                product_translations: {
                  where: { locale: 'en' },
                  take: 1
                }
              }
            }
          }
        },
        // Up-sell products
        up_sell_products_up_sell_products_product_idToproducts: {
          include: {
            products_up_sell_products_up_sell_product_idToproducts: {
              include: {
                product_translations: {
                  where: { locale: 'en' },
                  take: 1
                }
              }
            }
          }
        },
        up_sell_products_up_sell_products_up_sell_product_idToproducts: {
          include: {
            products_up_sell_products_product_idToproducts: {
              include: {
                product_translations: {
                  where: { locale: 'en' },
                  take: 1
                }
              }
            }
          }
        },
        // Cross-sell products
        cross_sell_products_cross_sell_products_product_idToproducts: {
          include: {
            products_cross_sell_products_cross_sell_product_idToproducts: {
              include: {
                product_translations: {
                  where: { locale: 'en' },
                  take: 1
                }
              }
            }
          }
        },
        cross_sell_products_cross_sell_products_cross_sell_product_idToproducts: {
          include: {
            products_cross_sell_products_product_idToproducts: {
              include: {
                product_translations: {
                  where: { locale: 'en' },
                  take: 1
                }
              }
            }
          }
        },
        // Shortage alternatives
        shortage_alternatives_shortage_alternatives_product_idToproducts: {
          include: {
            products_shortage_alternatives_alternative_product_idToproducts: {
              include: {
                product_translations: {
                  where: { locale: 'en' },
                  take: 1
                }
              }
            }
          }
        },
        shortage_alternatives_shortage_alternatives_alternative_product_idToproducts: {
          include: {
            products_shortage_alternatives_product_idToproducts: {
              include: {
                product_translations: {
                  where: { locale: 'en' },
                  take: 1
                }
              }
            }
          }
        },
      };

      // Build orderBy clause - avoid ordering by translations if not searching by name
      const orderByClause: any = {};
      if (sortBy === 'name') {
        // Skip ordering by name as it requires joining translations
        orderByClause.created_at = 'desc';
      } else if (sortBy === 'price') {
        orderByClause.price = sortOrder;
      } else {
        orderByClause[sortBy] = sortOrder;
      }

      // Execute query
      const [products, total] = await Promise.all([
        this.prisma.products.findMany({
          where: whereClause,
          include: includeClause,
          skip,
          take: limit,
          orderBy: orderByClause,
        }),
        this.prisma.products.count({ where: whereClause }),
      ]);

      return {
        data: products,
        meta: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      };
    } catch (error) {
      console.error('Search error:', error);
      throw error;
    }
  }

  // Get shortage products with alternatives from shortage_alternatives table
  async getShortageProducts(searchDto: SearchProductsDto) {
    try {
      const {
        page = 1,
        limit = 10,
        sortBy = 'created_at',
        sortOrder = 'desc'
      } = searchDto;

      // Calculate pagination
      const skip = (page - 1) * limit;

      // Build include clause for shortage products with alternatives
      const includeClause: any = {
        product_translations: {
          where: { locale: 'en' },
          take: 1
        },
        product_categories: {
          include: {
            categories: true
          }
        },
        product_variants: true,
        product_variations: {
          include: {
            variations: true
          }
        },
        product_options: {
          include: {
            options: {
              include: {
                option_translations: {
                  where: { locale: 'en' },
                  take: 1
                }
              }
            }
          }
        },
        product_attributes: {
          include: {
            attributes: {
              include: {
                attribute_translations: {
                  where: { locale: 'en' },
                  take: 1
                }
              }
            }
          }
        },
        product_tags: {
          include: {
            tags: {
              include: {
                tag_translations: {
                  where: { locale: 'en' },
                  take: 1
                }
              }
            }
          }
        },
        brands: true,
        // Shortage alternatives - get the alternative products
        shortage_alternatives_shortage_alternatives_product_idToproducts: {
          include: {
            products_shortage_alternatives_alternative_product_idToproducts: {
              include: {
                product_translations: {
                  where: { locale: 'en' },
                  take: 1
                }
              }
            }
          }
        },
      };

      // Build orderBy clause
      const orderByClause: any = {};
      if (sortBy === 'name') {
        orderByClause.created_at = 'desc';
      } else if (sortBy === 'price') {
        orderByClause.price = sortOrder;
      } else {
        orderByClause[sortBy] = sortOrder;
      }

      // Execute query - get products that have entries in shortage_alternatives table
      const [products, total] = await Promise.all([
        this.prisma.products.findMany({
          where: {
            is_active: true,
            is_shortage: true,
          },
          include: includeClause,
          skip,
          take: limit,
          orderBy: orderByClause,
        }),
        this.prisma.products.count({
          where: {
            is_active: true,
            is_shortage: true,
          }
        }),
      ]);

      return {
        data: products,
        meta: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      };
    } catch (error) {
      console.error('Get shortage products error:', error);
      throw error;
    }
  }

  // Cart Management Functionality
  async getCart(userId: number) {
    console.log(userId, typeof userId)
    if (isNaN(userId) || userId <= 0 || !Number.isInteger(userId)) {
      throw new BadRequestException('Invalid user ID');
    }

    const cart = await this.prisma.carts.findUnique({
      where: { id: userId.toString() },
    });

    if (!cart) {
      return { items: [], total: 0, count: 0 };
    }

    let cartData;
    try {
      cartData = JSON.parse(cart.data || '{}');
    } catch (error) {
      console.error('Error parsing cart data:', error);
      // If JSON parsing fails, return an empty cart to prevent errors
      return { items: [], total: 0, count: 0 };
    }

    const cartItems = Array.isArray(cartData.items) ? cartData.items : [];

    // Get product details for each item in the cart
    const detailedCartItems: {
      productId: number;
      quantity: number;
      product: {
        id: number;
        name: string;
        price: any; // Using any since price might be Decimal from Prisma
        slug: string;
        image: string | null;
      };
      subtotal: number;
    }[] = [];
    for (const item of cartItems) {
      try {
        // Validate the product ID from the cart item
        // Handle cases where productId might be a string, number, or undefined
        let itemId;

        if (typeof item.productId === 'string') {
          itemId = parseInt(item.productId, 10);
        } else if (typeof item.productId === 'number') {
          itemId = item.productId;
        } else {
          console.warn(`Invalid product ID type in cart: ${typeof item.productId}`, item.productId);
          continue; // Skip this item
        }

        if (isNaN(itemId) || itemId <= 0 || !Number.isInteger(itemId)) {
          console.warn(`Invalid product ID in cart: ${item.productId}`);
          continue; // Skip this item
        }

        try {
          const product = await this.prisma.products.findUnique({
            where: { id: itemId },
            include: {
              product_translations: {
                where: { locale: 'en' },
                take: 1
              }
            }
          });

          if (!product) {
            console.warn(`Product not found in database: ${itemId}`);
            continue; // Skip this item
          }

          detailedCartItems.push({
            productId: itemId, // Use the validated numeric ID instead of the original string
            quantity: item.quantity,
            product: {
              id: product.id,
              name: product.product_translations[0]?.name || 'Unknown Product',
              price: product.price,
              slug: product.slug,
              image: product.product_translations[0]?.description?.includes('img')
                ? product.product_translations[0]?.description
                : null,
            },
            subtotal: Number(product.price || 0) * item.quantity,
          });
        } catch (productError) {
          console.error(`Error fetching product ${itemId} for cart:`, productError);
          continue; // Skip this item
        }
      } catch (itemError) {
        console.error('Error processing cart item:', item, itemError);
        continue; // Skip this item
      }
    }

    // Calculate total
    const total = detailedCartItems.reduce((sum, item) => sum + item.subtotal, 0);

    return {
      items: detailedCartItems,
      total,
      count: detailedCartItems.reduce((sum, item) => sum + item.quantity, 0),
    };
  }

  async addToCart(userId: number, addToCartDto: AddToCartDto) {
    const { productId, quantity, productVariantId, options } = addToCartDto;

    // Validation to ensure IDs are valid positive integers
    if (isNaN(userId) || userId <= 0 || !Number.isInteger(userId)) {
      throw new BadRequestException('Invalid user ID');
    }
    if (isNaN(productId) || productId <= 0 || !Number.isInteger(productId)) {
      throw new BadRequestException('Invalid product ID');
    }

    // Verify product exists and is active
    const product = await this.prisma.products.findFirst({
      where: {
        id: productId,
        is_active: true
      },
    });

    if (!product) {
      throw new NotFoundException('Product not found or not available');
    }

    // Check if product has enough stock
    if (product.manage_stock && product.qty !== null && product.qty < quantity) {
      throw new BadRequestException('Insufficient stock for this product');
    }

    // Get existing cart or create new one
    let cart = await this.prisma.carts.findUnique({
      where: { id: userId.toString() },
    });

    let cartData: any = { items: [] };
    if (cart) {
      try {
        cartData = JSON.parse(cart.data || '{}');
      } catch (error) {
        console.error('Error parsing cart data in addToCart:', error);
        throw new BadRequestException('Invalid cart data format');
      }
    }

    // Check if product already exists in cart
    const existingItemIndex = cartData.items.findIndex(
      (item: any) => item.productId === productId
    );

    if (existingItemIndex > -1) {
      // Update quantity if item exists
      cartData.items[existingItemIndex].quantity += quantity;
    } else {
      // Add new item to cart
      cartData.items.push({
        productId,
        quantity,
        productVariantId,
        options,
      });
    }

    // Update or create cart
    if (cart) {
      await this.prisma.carts.update({
        where: { id: userId.toString() },
        data: {
          data: JSON.stringify(cartData),
          updated_at: new Date(),
        },
      });
    } else {
      await this.prisma.carts.create({
        data: {
          id: userId.toString(),
          data: JSON.stringify(cartData),
          created_at: new Date(),
          updated_at: new Date(),
        },
      });
    }

    return { message: 'Product added to cart successfully' };
  }

  async updateCartItem(userId: number, productId: number, updateCartItemDto: UpdateCartItemDto) {
    // Validation to ensure IDs are valid positive integers
    if (isNaN(userId) || userId <= 0 || !Number.isInteger(userId)) {
      throw new BadRequestException('Invalid user ID');
    }
    if (isNaN(productId) || productId <= 0 || !Number.isInteger(productId)) {
      throw new BadRequestException('Invalid product ID');
    }

    const { quantity, productVariantId } = updateCartItemDto;

    // Get existing cart
    const cart = await this.prisma.carts.findUnique({
      where: { id: userId.toString() },
    });

    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    let cartData;
    try {
      cartData = JSON.parse(cart.data || '{}');
    } catch (error) {
      console.error('Error parsing cart data in updateCartItem:', error);
      throw new BadRequestException('Invalid cart data format');
    }

    // Find the item to update
    const itemIndex = cartData.items.findIndex(
      (item: any) => item.productId === productId
    );

    if (itemIndex === -1) {
      throw new NotFoundException('Product not found in cart');
    }

    // Verify product exists and has enough stock if quantity is increasing
    const product = await this.prisma.products.findFirst({
      where: {
        id: productId,
        is_active: true
      },
    });

    if (!product) {
      throw new NotFoundException('Product not found or not available');
    }

    if (quantity && product.manage_stock && product.qty !== null && product.qty < quantity) {
      throw new BadRequestException('Insufficient stock for this product');
    }

    // Update the item
    if (quantity !== undefined) {
      cartData.items[itemIndex].quantity = quantity;
    }

    if (productVariantId !== undefined) {
      cartData.items[itemIndex].productVariantId = productVariantId;
    }

    // Remove item if quantity is 0
    if (quantity === 0) {
      cartData.items.splice(itemIndex, 1);
    }

    // Update cart
    await this.prisma.carts.update({
      where: { id: userId.toString() },
      data: {
        data: JSON.stringify(cartData),
        updated_at: new Date(),
      },
    });

    return { message: 'Cart item updated successfully' };
  }

  async removeFromCart(userId: number, productId: number) {
    // Validation to ensure IDs are valid positive integers
    if (isNaN(userId) || userId <= 0 || !Number.isInteger(userId)) {
      throw new BadRequestException('Invalid user ID');
    }
    if (isNaN(productId) || productId <= 0 || !Number.isInteger(productId)) {
      throw new BadRequestException('Invalid product ID');
    }

    // Get existing cart
    const cart = await this.prisma.carts.findUnique({
      where: { id: userId.toString() },
    });

    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    let cartData;
    try {
      cartData = JSON.parse(cart.data || '{}');
    } catch (error) {
      console.error('Error parsing cart data in removeFromCart:', error);
      throw new BadRequestException('Invalid cart data format');
    }

    // Find the item to remove
    const itemIndex = cartData.items.findIndex(
      (item: any) => item.productId === productId
    );

    if (itemIndex === -1) {
      throw new NotFoundException('Product not found in cart');
    }

    // Remove the item
    cartData.items.splice(itemIndex, 1);

    // Update cart
    await this.prisma.carts.update({
      where: { id: userId.toString() },
      data: {
        data: JSON.stringify(cartData),
        updated_at: new Date(),
      },
    });

    return { message: 'Product removed from cart successfully' };
  }

  async clearCart(userId: number) {
    const result = await this.prisma.carts.deleteMany({
      where: { id: userId.toString() },
    });

    if (result.count === 0) {
      // Cart doesn't exist, but that's fine - return success
      return { message: 'Cart cleared successfully' };
    }

    return { message: 'Cart cleared successfully' };
  }

  // Bookmark/Wishlist Functionality
  async addBookmark(userId: number, productId: number) {
    // Validation to ensure IDs are valid positive integers
    if (isNaN(userId) || userId <= 0 || !Number.isInteger(userId)) {
      throw new BadRequestException('Invalid user ID');
    }
    if (isNaN(productId) || productId <= 0 || !Number.isInteger(productId)) {
      throw new BadRequestException('Invalid product ID');
    }

    // Verify product exists and is active
    const product = await this.prisma.products.findFirst({
      where: {
        id: productId,
        is_active: true
      },
    });

    if (!product) {
      throw new NotFoundException('Product not found or not available');
    }

    // Check if already bookmarked
    const existingBookmark = await this.prisma.wish_lists.findUnique({
      where: {
        user_id_product_id: {
          user_id: userId,
          product_id: productId
        }
      }
    });

    if (existingBookmark) {
      throw new BadRequestException('Product already bookmarked');
    }

    // Add to wishlist
    await this.prisma.wish_lists.create({
      data: {
        user_id: userId,
        product_id: productId,
        created_at: new Date(),
        updated_at: new Date(),
      },
    });

    return { message: 'Product added to bookmarks successfully' };
  }

  async removeBookmark(userId: number, productId: number) {
    // Validation to ensure IDs are valid positive integers
    if (isNaN(userId) || userId <= 0 || !Number.isInteger(userId)) {
      throw new BadRequestException('Invalid user ID');
    }
    if (isNaN(productId) || productId <= 0 || !Number.isInteger(productId)) {
      throw new BadRequestException('Invalid product ID');
    }

    // Remove from wishlist
    const result = await this.prisma.wish_lists.deleteMany({
      where: {
        user_id: userId,
        product_id: productId
      }
    });

    if (result.count === 0) {
      throw new NotFoundException('Bookmark not found');
    }

    return { message: 'Product removed from bookmarks successfully' };
  }

  async getUserBookmarks(userId: number) {
    // Validation to ensure userId is a valid positive integer
    if (isNaN(userId) || userId <= 0 || !Number.isInteger(userId)) {
      throw new BadRequestException('Invalid user ID');
    }

    // Get user's bookmarked products with details
    const bookmarks = await this.prisma.wish_lists.findMany({
      where: {
        user_id: userId
      },
      include: {
        products: {
          include: {
            product_translations: {
              where: { locale: 'en' },
              take: 1
            },
            product_categories: {
              include: {
                categories: true
              }
            }
          }
        }
      },
      orderBy: {
        created_at: 'desc'
      }
    });

    return {
      items: bookmarks.map(bookmark => ({
        id: bookmark.products.id,
        name: bookmark.products.product_translations[0]?.name || 'Unknown Product',
        price: bookmark.products.price,
        slug: bookmark.products.slug,
        image: bookmark.products.product_translations[0]?.description?.includes('img')
          ? bookmark.products.product_translations[0]?.description
          : null,
        createdAt: bookmark.created_at,
      })),
      count: bookmarks.length
    };
  }

  async isBookmarked(userId: number, productId: number): Promise<boolean> {
    // Validation to ensure IDs are valid positive integers
    if (isNaN(userId) || userId <= 0 || !Number.isInteger(userId)) {
      throw new BadRequestException('Invalid user ID');
    }
    if (isNaN(productId) || productId <= 0 || !Number.isInteger(productId)) {
      throw new BadRequestException('Invalid product ID');
    }

    const bookmark = await this.prisma.wish_lists.findUnique({
      where: {
        user_id_product_id: {
          user_id: userId,
          product_id: productId
        }
      }
    });

    return !!bookmark;
  }

  // Checkout Functionality
  async checkout(userId: number, checkoutDto: CheckoutDto) {
    const { paymentMethod, shippingAddress, billingAddress, notes, sameAsShipping } = checkoutDto;

    // Get user details
    const user = await this.prisma.users.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Get user's cart
    const cart = await this.prisma.carts.findUnique({
      where: { id: userId.toString() },
    });

    if (!cart) {
      throw new BadRequestException('Cart is empty');
    }

    let cartData;
    try {
      cartData = JSON.parse(cart.data || '{}');
    } catch (error) {
      console.error('Error parsing cart data in checkout:', error);
      throw new BadRequestException('Invalid cart data format');
    }

    if (!cartData.items?.length) {
      throw new BadRequestException('Cart is empty');
    }

    const cartItems = cartData.items;

    if (!cartItems || cartItems.length === 0) {
      throw new BadRequestException('Cart is empty');
    }

    // Get product details and calculate totals
    let subTotal = 0;
    const orderProducts: any = [];

    for (const item of cartItems) {
      // Validate the product ID from the cart item
      const itemId = parseInt(item.productId);
      if (isNaN(itemId) || itemId <= 0 || !Number.isInteger(itemId)) {
        throw new BadRequestException(`Invalid product ID in cart: ${item.productId}`);
      }

      const product = await this.prisma.products.findFirst({
        where: {
          id: itemId,
          is_active: true
        },
        include: {
          product_translations: {
            where: { locale: 'en' },
            take: 1
          }
        }
      });

      if (!product) {
        throw new BadRequestException(`Product with ID ${itemId} not found or not available`);
      }

      // Check stock availability
      if (product.manage_stock && product.qty !== null && product.qty < item.quantity) {
        throw new BadRequestException(`Insufficient stock for ${product.product_translations[0]?.name || 'product'}`);
      }

      const itemTotal = Number(product.price || 0) * item.quantity;
      subTotal += itemTotal;

      orderProducts.push({
        product_id: product.id,
        unit_price: product.price || 0,
        qty: item.quantity,
        line_total: itemTotal,
      });
    }

    // Calculate shipping cost (simplified - in real app this would be more complex)
    const shippingCost = 0; // Could be calculated based on weight, distance, etc.

    // Calculate discount (simplified - could apply coupon codes here)
    const discount = 0; // Could apply coupon logic here

    // Calculate total
    const total = subTotal + shippingCost - discount;

    // Create order
    const order = await this.prisma.orders.create({
      data: {
        customer_id: userId,
        customer_email: user.email,
        customer_phone: user.phone,
        customer_first_name: user.first_name,
        customer_last_name: user.last_name,
        billing_first_name: user.first_name, // Using user's name as default
        billing_last_name: user.last_name,
        billing_address_1: billingAddress || 'Default Billing Address',
        billing_address_2: '',
        billing_city: 'Default City',
        billing_state: 'Default State',
        billing_zip: 'Default ZIP',
        billing_country: 'Default Country',
        shipping_first_name: user.first_name,
        shipping_last_name: user.last_name,
        shipping_address_1: shippingAddress || 'Default Shipping Address',
        shipping_address_2: '',
        shipping_city: 'Default City',
        shipping_state: 'Default State',
        shipping_zip: 'Default ZIP',
        shipping_country: 'Default Country',
        sub_total: subTotal,
        shipping_method: 'Standard',
        shipping_cost: shippingCost,
        discount: discount,
        total: total,
        payment_method: paymentMethod,
        currency: 'USD', // Could be dynamic based on user's locale
        currency_rate: 1, // Could be dynamic
        locale: 'en',
        status: 'pending', // Order status - could be 'pending', 'processing', 'shipped', 'delivered', 'cancelled'
        note: notes || '',
        created_at: new Date(),
        updated_at: new Date(),
      },
    });

    // Create order products
    for (const orderProduct of orderProducts) {
      await this.prisma.order_products.create({
        data: {
          order_id: order.id,
          product_id: orderProduct.product_id,
          unit_price: orderProduct.unit_price,
          qty: orderProduct.qty,
          line_total: orderProduct.line_total,
        },
      });

      // Update product stock if applicable
      const product = await this.prisma.products.findUnique({
        where: { id: orderProduct.product_id },
      });

      if (product && product.manage_stock && product.qty !== null) {
        await this.prisma.products.update({
          where: { id: orderProduct.product_id },
          data: {
            qty: product.qty - orderProduct.qty,
            updated_at: new Date(),
          },
        });
      }
    }

    // Clear the cart after successful checkout
    await this.prisma.carts.delete({
      where: { id: userId.toString() },
    });

    // Send order confirmation email
    try {
      const orderDetails = await this.prisma.orders.findUnique({
        where: { id: order.id },
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

      if (orderDetails) {
        const orderHtml = `
          <h2>Order Confirmation</h2>
          <p>Thank you for your order! Your order #${orderDetails.id} has been placed successfully.</p>

          <h3>Order Details:</h3>
          <p><strong>Customer:</strong> ${orderDetails.customer_first_name} ${orderDetails.customer_last_name}</p>
          <p><strong>Email:</strong> ${orderDetails.customer_email}</p>
          <p><strong>Date:</strong> ${orderDetails.created_at ? orderDetails.created_at.toISOString() : new Date().toISOString()}</p>
          <p><strong>Status:</strong> ${orderDetails.status}</p>
          <p><strong>Total:</strong> ${orderDetails.currency} ${Number(orderDetails.total).toFixed(2)}</p>

          <h3>Items Ordered:</h3>
          <ul>
            ${orderDetails.order_products.map(op => `
              <li>
                <strong>${op.products?.product_translations[0]?.name || 'Unknown Product'}</strong> -
                Quantity: ${op.qty}, Price: ${orderDetails.currency} ${Number(Number(op.unit_price) * Number(op.qty)).toFixed(2)}
              </li>
            `).join('')}
          </ul>

          <h3>Shipping Address:</h3>
          <p>${orderDetails.shipping_address_1}, ${orderDetails.shipping_city}, ${orderDetails.shipping_state}, ${orderDetails.shipping_zip}, ${orderDetails.shipping_country}</p>

          <h3>Payment Method:</h3>
          <p>${orderDetails.payment_method}</p>

          <p>We will notify you once your order has been processed.</p>
        `;

        await this.mailService.sendMail(
          orderDetails.customer_email,
          'Order Confirmation - Order #' + orderDetails.id,
          orderHtml
        );

        // Send admin order notification
        try {
          const adminSetting = await this.prisma.settings.findUnique({
            where: { key: 'store_email' }
          });

          if (adminSetting && adminSetting.plain_value) {
            // Handle PHP serialized string format (e.g., s:21:"email @example.com";)
            let adminEmail = adminSetting.plain_value;
            const phpSerializedMatch = adminSetting.plain_value.match(/s:\d+:"([^"]+)"/);
            if (phpSerializedMatch) {
              adminEmail = phpSerializedMatch[1];
            }

            await this.mailService.sendAdminOrderNotification(adminEmail, {
              id: orderDetails.id,
              customerFirstName: orderDetails.customer_first_name,
              customerLastName: orderDetails.customer_last_name,
              customerEmail: orderDetails.customer_email,
              total: orderDetails.total.toString(),
              currency: orderDetails.currency,
              status: orderDetails.status,
              createdAt: orderDetails.created_at || new Date(),
              itemCount: orderDetails.order_products.length
            });
          }
        } catch (adminEmailError) {
          console.error('Failed to send admin order notification:', adminEmailError);
          // Don't throw error as the order was still placed successfully and customer email was sent
        }
      }
    } catch (emailError) {
      console.error('Failed to send order confirmation email:', emailError);
      // Don't throw error as the order was still placed successfully
    }

    // Return order details
    return {
      message: 'Order placed successfully',
      orderId: order.id,
      total: order.total,
      status: order.status,
    };
  }
}
