import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { Decimal } from '@prisma/client/runtime/library';

@Injectable()
export class AccessProgramService {
  constructor(private prisma: PrismaService) {}

  // Get all access programs (using products as programs)
  async getAllAccessPrograms() {
    // Get products that represent access programs
    // In this implementation, we'll consider products as access programs
    const products = await this.prisma.products.findMany({
      where: {
        is_active: true
      },
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
      },
      orderBy: {
        created_at: 'desc'
      }
    });

    // Transform products to access program format
    return products.map(product => ({
      id: product.id,
      name: product.product_translations[0]?.name || 'Unnamed Program',
      company: product.brand_id ? `Brand #${product.brand_id}` : 'Unknown Company',
      status: product.is_active ? 'Accepting new patients' : 'Closed',
      description: product.product_translations[0]?.description || '',
      estimatedDelivery: 'Available at checkout',
      slug: product.slug,
      price: product.price?.toString() || '0',
      createdAt: product.created_at,
      updatedAt: product.updated_at,
    }));
  }

  // Get access program by ID
  async getAccessProgramById(id: number) {
    const product = await this.prisma.products.findUnique({
      where: { id },
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
    });

    if (!product) {
      throw new NotFoundException('Access program not found');
    }

    return {
      id: product.id,
      name: product.product_translations[0]?.name || 'Unnamed Program',
      company: product.brand_id ? `Brand #${product.brand_id}` : 'Unknown Company',
      status: product.is_active ? 'Accepting new patients' : 'Closed',
      description: product.product_translations[0]?.description || '',
      estimatedDelivery: 'Available at checkout',
      slug: product.slug,
      price: product.price?.toString() || '0',
      createdAt: product.created_at,
      updatedAt: product.updated_at,
    };
  }

  // Get patients for an access program (using orders with customer_id)
  async getPatientsForProgram(programId: number) {
    // This is a simplified implementation
    // In a real system, you might have a more direct relationship between programs and patients
    // For now, we'll return orders that might be related to the program

    // Get orders that contain products related to this program
    const orders = await this.prisma.orders.findMany({
      where: {
        order_products: {
          some: {
            product_id: programId
          }
        }
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
      }
    });

    // Extract patient information from orders
    const patients = orders.map(order => ({
      id: order.id,
      patientId: `ORD-${order.id}`, // Using order ID as patient ID
      firstName: order.customer_first_name,
      lastName: order.customer_last_name,
      email: order.customer_email,
      phone: order.customer_phone,
      programId: programId,
      status: order.status,
      createdAt: order.created_at,
      updatedAt: order.updated_at,
    }));

    return patients;
  }

  // Create a patient (create an order that represents a patient enrollment)
  async createPatient(createPatientDto: CreatePatientDto, user?: any) {
    // In this implementation, creating a patient means creating an order
    // that represents their enrollment in a program

    // First, verify the program (product) exists
    const product = await this.prisma.products.findUnique({
      where: { id: createPatientDto.programId }
    });

    if (!product) {
      throw new NotFoundException('Program not found');
    }

    // Create an order that represents the patient enrollment
    const orderData: any = {
      customer_email: createPatientDto.email || `${createPatientDto.firstName}.${createPatientDto.lastName}@example.com`,
      customer_phone: createPatientDto.phone || '',
      customer_first_name: createPatientDto.firstName,
      customer_last_name: createPatientDto.lastName,
      billing_first_name: createPatientDto.firstName,
      billing_last_name: createPatientDto.lastName,
      billing_address_1: createPatientDto.address || 'N/A',
      billing_city: createPatientDto.city || 'N/A',
      billing_state: createPatientDto.state || 'N/A',
      billing_zip: createPatientDto.zip || 'N/A',
      billing_country: createPatientDto.country || 'N/A',
      shipping_first_name: createPatientDto.firstName,
      shipping_last_name: createPatientDto.lastName,
      shipping_address_1: createPatientDto.address || 'N/A',
      shipping_city: createPatientDto.city || 'N/A',
      shipping_state: createPatientDto.state || 'N/A',
      shipping_zip: createPatientDto.zip || 'N/A',
      shipping_country: createPatientDto.country || 'N/A',
      sub_total: new Decimal('0'),
      shipping_cost: new Decimal('0'),
      discount: new Decimal('0'),
      total: new Decimal('0'),
      payment_method: 'N/A',
      currency: 'USD',
      currency_rate: new Decimal('1'),
      locale: 'en',
      status: 'pending',
      note: `Patient enrollment for ${createPatientDto.firstName} ${createPatientDto.lastName}`,
      created_at: new Date(),
      updated_at: new Date(),
    };

    // Only add customer_id if it exists to avoid setting it to null/undefined
    if (user?.userId || user?.sub) {
      orderData.customer_id = user?.userId || user?.sub;
    }

    const order = await this.prisma.orders.create({
      data: orderData
    });

    // Add the product to the order
    await this.prisma.order_products.create({
      data: {
        order_id: order.id,
        product_id: createPatientDto.programId,
        unit_price: product.price || new Decimal('0'),
        qty: 1,
        line_total: product.price || new Decimal('0'),
      }
    });

    return {
      id: order.id,
      patientId: `ORD-${order.id}`,
      firstName: order.customer_first_name,
      lastName: order.customer_last_name,
      email: order.customer_email,
      phone: order.customer_phone,
      programId: createPatientDto.programId,
      status: order.status,
      createdAt: order.created_at,
      updatedAt: order.updated_at,
      dob: createPatientDto.dob,
      gender: createPatientDto.gender,
      address: createPatientDto.address,
      city: createPatientDto.city,
      state: createPatientDto.state,
      zip: createPatientDto.zip,
      country: createPatientDto.country || 'UK',
    };
  }

  // Get all patients - enhanced with static data
  async getAllPatients() {
    // Get patients from the database (orders)
    const dbPatients = await this.prisma.orders.findMany({
      orderBy: {
        created_at: 'desc'
      }
    });

    const dbPatientsFormatted = dbPatients.map(order => ({
      id: order.id,
      patientId: `ORD-${order.id}`,
      firstName: order.customer_first_name,
      lastName: order.customer_last_name,
      email: order.customer_email,
      phone: order.customer_phone,
      status: order.status,
      createdAt: order.created_at,
      updatedAt: order.updated_at,
      dob: null,
      gender: null,
      address: order.billing_address_1,
      city: order.billing_city,
      state: order.billing_state,
      zip: order.billing_zip,
      country: order.billing_country,
    }));

    // Add static patients for demonstration purposes
    const staticPatients = [
      {
        id: 999,
        patientId: 'PAT-001',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '+44 123 456 7890',
        programId: 1,
        status: 'active',
        createdAt: '2023-01-15T10:30:00Z',
        updatedAt: '2023-01-15T10:30:00Z',
        dob: '1985-05-15',
        gender: 'Male',
        address: '123 Main St',
        city: 'London',
        state: 'England',
        zip: 'SW1A 1AA',
        country: 'UK',
      },
      {
        id: 998,
        patientId: 'PAT-002',
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@example.com',
        phone: '+44 987 654 3210',
        programId: 2,
        status: 'active',
        createdAt: '2023-02-20T14:45:00Z',
        updatedAt: '2023-02-20T14:45:00Z',
        dob: '1990-08-22',
        gender: 'Female',
        address: '456 Oak Ave',
        city: 'Manchester',
        state: 'England',
        zip: 'M1 1AA',
        country: 'UK',
      },
      {
        id: 997,
        patientId: 'PAT-003',
        firstName: 'Robert',
        lastName: 'Johnson',
        email: 'robert.j@example.com',
        phone: '+44 555 123 4567',
        programId: 1,
        status: 'inactive',
        createdAt: '2023-03-10T09:15:00Z',
        updatedAt: '2023-03-10T09:15:00Z',
        dob: '1978-12-03',
        gender: 'Male',
        address: '789 Pine Rd',
        city: 'Birmingham',
        state: 'England',
        zip: 'B1 1AA',
        country: 'UK',
      }
    ];

    // Combine database patients with static patients
    return [...dbPatientsFormatted, ...staticPatients];
  }

  // Get patient by ID
  async getPatientById(id: number) {
    // First, try to find in database (orders)
    const order = await this.prisma.orders.findUnique({
      where: { id }
    });

    if (order) {
      return {
        id: order.id,
        patientId: `ORD-${order.id}`,
        firstName: order.customer_first_name,
        lastName: order.customer_last_name,
        email: order.customer_email,
        phone: order.customer_phone,
        status: order.status,
        createdAt: order.created_at,
        updatedAt: order.updated_at,
        dob: null,
        gender: null,
        address: order.billing_address_1,
        city: order.billing_city,
        state: order.billing_state,
        zip: order.billing_zip,
        country: order.billing_country,
      };
    }

    // If not found in database, check static data
    const staticPatients = [
      {
        id: 999,
        patientId: 'PAT-001',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '+44 123 456 7890',
        programId: 1,
        status: 'active',
        createdAt: '2023-01-15T10:30:00Z',
        updatedAt: '2023-01-15T10:30:00Z',
        dob: '1985-05-15',
        gender: 'Male',
        address: '123 Main St',
        city: 'London',
        state: 'England',
        zip: 'SW1A 1AA',
        country: 'UK',
      },
      {
        id: 998,
        patientId: 'PAT-002',
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@example.com',
        phone: '+44 987 654 3210',
        programId: 2,
        status: 'active',
        createdAt: '2023-02-20T14:45:00Z',
        updatedAt: '2023-02-20T14:45:00Z',
        dob: '1990-08-22',
        gender: 'Female',
        address: '456 Oak Ave',
        city: 'Manchester',
        state: 'England',
        zip: 'M1 1AA',
        country: 'UK',
      },
      {
        id: 997,
        patientId: 'PAT-003',
        firstName: 'Robert',
        lastName: 'Johnson',
        email: 'robert.j@example.com',
        phone: '+44 555 123 4567',
        programId: 1,
        status: 'inactive',
        createdAt: '2023-03-10T09:15:00Z',
        updatedAt: '2023-03-10T09:15:00Z',
        dob: '1978-12-03',
        gender: 'Male',
        address: '789 Pine Rd',
        city: 'Birmingham',
        state: 'England',
        zip: 'B1 1AA',
        country: 'UK',
      }
    ];

    const patient = staticPatients.find(p => p.id === id);
    if (patient) {
      return patient;
    }

    throw new NotFoundException('Patient not found');
  }
}