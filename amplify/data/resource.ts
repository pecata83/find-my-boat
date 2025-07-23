import { type ClientSchema, a, defineData } from '@aws-amplify/backend';
import { postConfirmation } from "../auth/post-confirmation/resource";

const schema = a.schema({
  UserProfile: a
    .model({
      name: a.string(),
      email: a.email(),
      state: a.json(),
      profileOwner: a.id().required(),
      img: a.string(),
      // boats: a.hasMany("Boat", "ownerId"),
    })
    .identifier(["profileOwner"])
    // .secondaryIndexes((index) => [index("profileOwner")])
    .authorization(allow => [allow.ownerDefinedIn("profileOwner"),]),
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