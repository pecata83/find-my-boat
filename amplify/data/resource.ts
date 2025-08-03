import { type ClientSchema, a, defineData } from '@aws-amplify/backend';
import { postConfirmation } from "../auth/post-confirmation/resource";

const schema = a.schema({
  Location: a.customType({
    lat: a.float(),
    lng: a.float(),
  }),

  Image: a.customType({
    src: a.string(),
    title: a.string(),
  }),

  UserProfile: a
    .model({
      name: a.string(),
      email: a.email(),
      state: a.json(),
      profileOwner: a.id().required(),
      img: a.string(),
    })
    .identifier(["profileOwner"])
    .authorization(allow => [allow.ownerDefinedIn("profileOwner"),]),


  Boat: a
    .model({
      type: a.string().default("Boat"),
      status: a.string().default("DISABLED"),
      content: a.string(),
      name: a.string(),
      thumb: a.ref("Image"),
      gallery: a.json(),
      ownerId: a.id().required(),
      stars: a.string(),
      reviews: a.hasMany("Reviews", "boatId"),
      location: a.ref("Location"),
      anchorLocation: a.ref("Location"),
      anchorRadius: a.integer().default(0),
    })
    .authorization((allow) => [
      allow.groups(["ADMIN"]),
      allow.owner(),
      allow.publicApiKey().to(["read"]),
    ]),

  Reviews: a
    .model({
      content: a.string(),
      rating: a.float(),
      authorId: a.id().required(),
      boatId: a.id(),
      boat: a.belongsTo("Boat", "boatId"),
    }).authorization((allow) => [
      allow.groups(["ADMIN"]),
      allow.owner(),
      allow.publicApiKey().to(["read"]),
    ]),
}).authorization((allow) => [allow.resource(postConfirmation)]);;

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'apiKey',
    // API Key is used for a.allow.public() rules
    apiKeyAuthorizationMode: {
      expiresInDays: 360,
    },
  },
});