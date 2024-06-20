import * as main from './main';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

jest.mock('@nestjs/core');
jest.mock('./app.module');

describe('Main', () => {
  it('should bootstrap the application', async () => {
    const mockEnableCors = jest.fn();
    const mockListen = jest.fn();

    const mockApp = { enableCors: mockEnableCors, listen: mockListen };

    const mockCreate = NestFactory.create as jest.Mock;

    mockCreate.mockResolvedValue(mockApp);

    await main.bootstrap();

    expect(mockCreate).toHaveBeenCalledWith(AppModule);
    expect(mockEnableCors).toHaveBeenCalled();
    expect(mockListen).toHaveBeenCalled();
  });
});
