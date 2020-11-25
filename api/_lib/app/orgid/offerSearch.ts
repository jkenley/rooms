import { hotelCollectionMapper, readHotels as readHotelsDbFunc } from '../../../_lib/data/hotel'
import { roomTypeCollectionMapper, readRoomTypes as readRoomTypesDbFunc } from '../../../_lib/data/room_type'
import {
  IHotelCollection, IHotelDbRecordCollection,
  IRoomTypeCollection, IRoomTypeDbRecordCollection,
  IOfferSearchResults
} from '../../../_lib/types'

async function offerSearch(): Promise<IOfferSearchResults> {
  const roomTypeDbRecordCollection: IRoomTypeDbRecordCollection = await readRoomTypesDbFunc()
  const roomTypes: IRoomTypeCollection = roomTypeCollectionMapper(roomTypeDbRecordCollection)

  const hotelDbRecordCollection: IHotelDbRecordCollection = await readHotelsDbFunc()
  const hotels: IHotelCollection = hotelCollectionMapper(hotelDbRecordCollection)

  const result: IOfferSearchResults = {
    accommodations: {},
    "pricePlans": {
      "BAR": {
        "name": "Winding Tree BAR",
        "penalties": {
          "refund": {
            "refundable": true
          }
        }
      }
    },
    offers: {},
    passengers: {
      "PAX1": {
        "type": "ADT"
      }
    }
  }

  hotels.forEach((hotel) => {
    result.accommodations[hotel.id] = {
      name: hotel.name,
      type: 'hotel',
      description: 'Hotel provided by Rooms project.',
      location: {
        coordinates: {
          latitude: hotel.location.lat,
          longitude: hotel.location.lng,
        },
      },
      rating: 5,
      contactInformation: {
        phoneNumbers: [],
        emails: [],
        address: {
          streetAddress: hotel.address,
          premise: '',
          locality: '',
          postalCode: '',
          country: '',
        },
      },
      checkinoutPolicy: {
        checkinTime: "15:00",
        checkoutTime: "24:00",
      },
      otherPolicies: {},
      media: [],
      roomTypes: {},
    }

    roomTypes.forEach((roomType) => {
      result.accommodations[hotel.id].roomTypes[roomType.id] = {
        "name": roomType.type,
        "description": 'Room provided by Rooms project.',
        "amenities": roomType.amenities.split(';'),
        "size": {
          "value": "",
          "_unit_": ""
        },
        "maximumOccupancy": {
          "adults": "2",
          "childs": "1"
        },
        "media": [],
        "policies": {}
      }
    })
  })

  roomTypes.forEach((roomType) => {
    hotels.forEach((hotel) => {

      result.offers[`${roomType.id}-${hotel.id}`] = {
        pricePlansReferences: {
          BAR: {
            accommodation: hotel.id,
            roomType: roomType.type,
          },
        },
        price: {
          currency: 'EUR',
          public: roomType.price,
          taxes: 0,
        },
      }

    })
  })

  return result
}

export {
  offerSearch,
}