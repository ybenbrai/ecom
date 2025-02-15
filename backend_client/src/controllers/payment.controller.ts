import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { PaymentService } from 'src/services/payment.service';
import { Payment } from 'src/entities/payment.entity';

@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  async create(@Body() paymentData: Partial<Payment>): Promise<Payment> {
    return this.paymentService.create(paymentData);
  }

  @Get()
  async findAll(): Promise<Payment[]> {
    return this.paymentService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<Payment> {
    return this.paymentService.findById(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() paymentData: Partial<Payment>,
  ): Promise<Payment> {
    return this.paymentService.update(id, paymentData);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.paymentService.remove(id);
  }
}
