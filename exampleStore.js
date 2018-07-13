const exampleStore = {
  // ** Redux specific data
  userChosen: {
    Rover: 'string',
    Camera: 'string',
    Day: 'string',
    Picture: 'string',
  },
  recentlyViewed: [
    // Can only be 4 photos
    [
      //  Id
    ]
  ],
  // ** End Redux specific data
  Rovers: {
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
  Days: {
    "date": {
      Rover: [
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
    }
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