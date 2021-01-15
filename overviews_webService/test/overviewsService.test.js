
import axios from 'axios';

describe('overviewsService', () => {
  test('getAll Objects', async () => {
    const response = await axios.post('http://localhost:4000', {
      query: `
            query {
              getAllObjectInfo{
                _id
                queryName
                objectType
                graph{
                  title
                  labelX
                  labelY
                }
              }
            }
            `,
    });

    const {data} = response;
    expect(data).toMatchObject({
      "data": {
        "getAllObjectInfo": [
          {
            "_id": "RDBECOLIOV00002",
            "queryName": "PromotersByGene",
            "objectType": "gene",
            "graph": {
              "title": "Number of promoters transcribing the gene",
              "labelX": "Number of Promoters",
              "labelY": "Number of genes"
            }
          },
          {
            "_id": "RDBECOLIOV00001",
            "queryName": "TFsByGene",
            "objectType": "gene",
            "graph": {
              "title": "Number of Transcription Factors per Gene",
              "labelX": "Number of Transcription Factors",
              "labelY": "Number of genes"
            }
          }
        ]
      },
    });
  });

  test('getOverviews por ID', async () => {
    const response = await axios.post('http://localhost:4000', {
      query: `
            query{
              getOverview(_id:"RDBECOLIOV00002"){
                _id
                queryName
                objectType
                graph{
                  title
                  description
                  labelX
                  labelY
                  footGraph
                  graphType
                }
                data{
                  xAxis
                  yAxis
                  objectsRelated{
                    _id
                    name
                  }
                }
                
              }
              }
            `,
    });

    const {data} = response;
    expect(data).toMatchObject({
      "data": {
        "getOverview": {
          "_id": "RDBECOLIOV00002",
          "queryName": "PromotersByGene",
          "objectType": "gene",
          "graph": {
            "title": "Number of promoters transcribing the gene",
            "footGraph": "The graph shows the total of genes (y-axis) that are transcribed by a certain number of promoters (x-axis).",
            "graphType": "Bar"
          },
          "data": [
            {
              "xAxis": 9,
              "yAxis": 5
            },
            {
              "xAxis": 7,
              "yAxis": 41
            },
            {
              "xAxis": 6,
              "yAxis": 27
            },
            {
              "xAxis": 8,
              "yAxis": 21
            },
            {
              "xAxis": 11,
              "yAxis": 14
            },
            {
              "xAxis": 3,
              "yAxis": 279
            },
            {
              "xAxis": 13,
              "yAxis": 16
            },
            {
              "xAxis": 0,
              "yAxis": 1707
            },
            {
              "xAxis": null,
              "yAxis": 214
            },
            {
              "xAxis": 5,
              "yAxis": 53
            },
            {
              "xAxis": 4,
              "yAxis": 190
            },
            {
              "xAxis": 1,
              "yAxis": 1522
            },
            {
              "xAxis": 2,
              "yAxis": 615
            }
          ]
        }
      },
    });
  });
});