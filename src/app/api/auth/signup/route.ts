import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const data = await request.json();
    const { name, email, password, type = 'CUSTOMER' } = data;

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, error: 'Name, email, and password are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { success: false, error: 'Email already in use' },
        { status: 409 }
      );
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create user with correct type
    const userType = ['ADMIN', 'VENDOR', 'CUSTOMER'].includes(type) ? type : 'CUSTOMER';
    
    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        type: userType,
      },
    });

    // If user is a vendor, create vendor profile as well
    if (userType === 'VENDOR') {
      await prisma.vendor.create({
        data: {
          userId: user.id,
          storeName: data.storeName || `${name}'s Store`,
          status: 'PENDING',
        },
      });
    }

    // Create cart and wishlist for customers
    if (userType === 'CUSTOMER') {
      await prisma.cart.create({
        data: {
          userId: user.id,
        },
      });

      await prisma.wishlist.create({
        data: {
          userId: user.id,
        },
      });
    }

    return NextResponse.json({
      success: true,
      message: 'User registered successfully',
    });
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}