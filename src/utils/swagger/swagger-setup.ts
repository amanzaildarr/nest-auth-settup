import { INestApplication } from '@nestjs/common';
import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerCustomOptions,
} from '@nestjs/swagger';
import { copyFile, readFile } from 'fs/promises';

const tsCssPath = `${process.cwd()}/src/utils/swagger/custom.css`;
const jsCssPath = `${process.cwd()}/dist/utils/swagger/custom.css`;

const options = new DocumentBuilder()
  .setTitle('DrSignet API')
  .setDescription(
    'Comprehensive documentation for the DrSignet APIs.\n\n' +
      'This documentation provides detailed information and interactive access to all available endpoints, ' +
      'helping developers integrate with the DrSignet platform effectively.\n\n' +
      'For more information, visit our [website](https://www.drsignet.com) or check our ' +
      '[GitHub repository](https://github.com/drsignet).\n\n' +
      '### Key Features\n' +
      '- Secure and efficient authentication\n' +
      '- Comprehensive CRUD operations\n' +
      '- Detailed analytics and reporting\n\n' +
      '### Contact\n' +
      'For support, please contact our team at [support@drsignet.com](mailto:support@drsignet.com).\n\n' +
      '### License\n' +
      'This API is licensed under the MIT License. See the [LICENSE](https://github.com/drsignet/license) file for more details.',
  )
  .setVersion('1.0.1')
  .setTermsOfService('https://www.drsignet.com/terms')
  .addBearerAuth(
    { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
    'access-token',
  )
  .addTag('Auth', 'Authentication related endpoints')
  .addTag('User', 'User related endpoints')
  .build();

async function setupSwagger(app: INestApplication) {
  const appDocument = SwaggerModule.createDocument(app, options);
  await copyFile(tsCssPath, jsCssPath);

  const customOptions: SwaggerCustomOptions = {
    customSiteTitle: 'DrSignet API Documentation',
    swaggerOptions: {
      docExpansion: 'none', // Collapse all sections by default
    },
    customCss: await readFile(jsCssPath, 'utf-8'),
  };

  SwaggerModule.setup('docs', app, appDocument, customOptions);
}

export { setupSwagger };
