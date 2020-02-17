import { Test, TestingModule } from '@nestjs/testing';
import { CdbController } from './controller';
import { CdbService } from './service';
import marketData from './marketData.json';

jest.mock('./marketData.json', () => ([
  {
    "sSecurityName": "CDI",
    "dtDate": "16/11/2016",
    "dLastTradePrice": 13.88
  },
  {
    "sSecurityName": "CDI",
    "dtDate": "14/11/2016",
    "dLastTradePrice": 13.88
  },
]));

describe('AppController', () => {
  let appController: CdbController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CdbController],
      providers: [CdbService],
    }).compile();

    appController = app.get<CdbController>(CdbController);
  });

  describe('/cdb/post-fixed', () => {
    describe('given an investment date, cdbRate and currentDate', () => {
      it('should return a daily unit price', () => {

        const mockConsumer = {
          "investmentDate":"2016-11-14",
          "cdbRate": 103.5,
          "currentDate":"2016-11-16"
        }

        expect(appController.cdb(mockConsumer)).toEqual([
          {
            "date": "2016-11-14",
            "unitPrice": 1000.53397
          },
          {
            "date": "2016-11-16",
            "unitPrice": 1001.06822
          }
        ]);
      });
    });
  });
});
