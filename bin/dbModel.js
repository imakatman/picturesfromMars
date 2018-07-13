const dbModel = {
  rovers: {
    ...,
    Rover: {
      name: 'string',
      id: 'number',
      total_photos: 'number',
      launch_date: 'string',
      landed_date: 'string',
      most_recent_date: 'string',
      most_recent_sol: 'number',
      cameras: [{ id: 'string', name: 'string' }],
      // pictures: [/*Just collection of ids*/]
    }
  },
  // Cameras: {
  //   ...,
  //   CameraId: {
  //     id: 'string',
  //     name: 'string',
  //     pictures: [
  //       //ids
  //     ],
  //     emptyDays: [],
  //     // availableDays: [],
  //     rover: 'string'
  //   }
  // },
  dates: {
    id: "number",
    name: "string",
    [earth_date]: [
      {
        "photo_id": {
          src: 'string',
          earth_date: 'string',
          sol: 'number',
          rover: 'string',
          camera: 'string'
        }
      }
    ]
  },
  // Pictures: [
  //  {
  //    id: {
  //      src: 'string',
  //      day: 'string',
  //      sol: 'number'
  //    }
  //  }
  // ],
  // EarthDate: {
  //   EarthDate: {
  //     Rover: {
  //       Camera: {
  //
  //       }
  //     }
  //   }
  //
  // }
}