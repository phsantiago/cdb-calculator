import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Health check ok!');
  });
  it('/cdb/post-fixed (POST)', () => {
    return request(app.getHttpServer())
      .post('/cdb/post-fixed')
      .send({
        "investmentDate":"2016-11-14",
        "cdbRate": 103.5,
        "currentDate":"2016-12-26"
      })
      .expect(200)
      .expect(
        [
          {
              "unitPrice": 1000.53397,
              "date": "2016-11-14"
          },
          {
              "unitPrice": 1001.06822,
              "date": "2016-11-16"
          },
          {
              "unitPrice": 1001.60276,
              "date": "2016-11-17"
          },
          {
              "unitPrice": 1002.13758,
              "date": "2016-11-18"
          },
          {
              "unitPrice": 1002.67269,
              "date": "2016-11-21"
          },
          {
              "unitPrice": 1003.20808,
              "date": "2016-11-22"
          },
          {
              "unitPrice": 1003.74376,
              "date": "2016-11-23"
          },
          {
              "unitPrice": 1004.27973,
              "date": "2016-11-24"
          },
          {
              "unitPrice": 1004.81598,
              "date": "2016-11-25"
          },
          {
              "unitPrice": 1005.35252,
              "date": "2016-11-28"
          },
          {
              "unitPrice": 1005.88934,
              "date": "2016-11-29"
          },
          {
              "unitPrice": 1006.42645,
              "date": "2016-11-30"
          },
          {
              "unitPrice": 1006.84564,
              "date": "2016-12-01"
          },
          {
              "unitPrice": 1007.37417,
              "date": "2016-12-02"
          },
          {
              "unitPrice": 1007.90297,
              "date": "2016-12-05"
          },
          {
              "unitPrice": 1008.43205,
              "date": "2016-12-06"
          },
          {
              "unitPrice": 1008.96141,
              "date": "2016-12-07"
          },
          {
              "unitPrice": 1009.49104,
              "date": "2016-12-08"
          },
          {
              "unitPrice": 1010.02095,
              "date": "2016-12-09"
          },
          {
              "unitPrice": 1010.55115,
              "date": "2016-12-12"
          },
          {
              "unitPrice": 1011.08162,
              "date": "2016-12-13"
          },
          {
              "unitPrice": 1011.61236,
              "date": "2016-12-14"
          },
          {
              "unitPrice": 1012.14339,
              "date": "2016-12-15"
          },
          {
              "unitPrice": 1012.6747,
              "date": "2016-12-16"
          },
          {
              "unitPrice": 1013.20628,
              "date": "2016-12-19"
          },
          {
              "unitPrice": 1013.73815,
              "date": "2016-12-20"
          },
          {
              "unitPrice": 1014.27029,
              "date": "2016-12-21"
          },
          {
              "unitPrice": 1014.80271,
              "date": "2016-12-22"
          },
          {
              "unitPrice": 1015.33541,
              "date": "2016-12-23"
          },
          {
              "unitPrice": 1015.86839,
              "date": "2016-12-26"
          }
        ]
      );
  });
});
