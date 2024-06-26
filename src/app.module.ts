import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import {
  AcceptLanguageResolver,
  GraphQLWebsocketResolver,
  I18nModule,
  QueryResolver,
} from 'nestjs-i18n';
import path from 'path';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    // Load environment variables from .env file globally
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),

    // Configure internationalization (i18n) module
    I18nModule.forRoot({
      fallbackLanguage: 'en', // Set fallback language
      loaderOptions: { path: path.join(__dirname, '/i18n/'), watch: true }, // Set path for language files
      resolvers: [
        GraphQLWebsocketResolver, // Resolver for GraphQL WebSockets
        { use: QueryResolver, options: ['lang'] }, // Resolver for language query parameter
        AcceptLanguageResolver, // Resolver for Accept-Language header
      ],
    }),

    // Configure Mongoose with the provided DB_URI
    MongooseModule.forRoot(process.env.DB_URI),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
