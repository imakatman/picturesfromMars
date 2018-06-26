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
      landed_day: 'string',
      most_recent_day: 'string',
      most_recent_sol: 'number',
      cameras: [{ id: 'string', name: 'string' }],
      // pictures: [/*Just collection of ids*/]
    }
  },
  Cameras: {
    ...,
    CameraId: {
      id: 'string',
      name: 'string',
      pictures: [
        //ids
      ],
      emptyDays: [],
      // availableDays: [],
      rover: 'string'
    }
  },
  Date: {
    "date": [
      {
        "photo_id": {
          src: 'string',
          day: 'string',
          sol: 'number',
          rover: 'string',
          camera: 'string'
        }
      }
    ]
  },
  Pictures: [
   {
     id: {
       src: 'string',
       day: 'string',
       sol: 'number'
     }
   }
  ],
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