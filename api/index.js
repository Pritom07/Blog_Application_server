var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/app.ts
import express from "express";

// src/modules/Posts/posts.routes.ts
import { Router } from "express";

// generated/prisma/client.ts
import * as path from "path";
import { fileURLToPath } from "url";

// generated/prisma/internal/class.ts
import * as runtime from "@prisma/client/runtime/client";
var config = {
  "previewFeatures": [],
  "clientVersion": "7.4.1",
  "engineVersion": "55ae170b1ced7fc6ed07a15f110549408c501bb3",
  "activeProvider": "postgresql",
  "inlineSchema": 'model User {\n  id            String    @id\n  name          String\n  email         String\n  emailVerified Boolean   @default(false)\n  image         String?\n  createdAt     DateTime  @default(now())\n  updatedAt     DateTime  @updatedAt\n  sessions      Session[]\n  accounts      Account[]\n\n  role   String? @default("USER")\n  phone  String?\n  status String? @default("ACTIVE")\n\n  @@unique([email])\n  @@map("user")\n}\n\nmodel Session {\n  id        String   @id\n  expiresAt DateTime\n  token     String\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n  ipAddress String?\n  userAgent String?\n  userId    String\n  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  @@unique([token])\n  @@index([userId])\n  @@map("session")\n}\n\nmodel Account {\n  id                    String    @id\n  accountId             String\n  providerId            String\n  userId                String\n  user                  User      @relation(fields: [userId], references: [id], onDelete: Cascade)\n  accessToken           String?\n  refreshToken          String?\n  idToken               String?\n  accessTokenExpiresAt  DateTime?\n  refreshTokenExpiresAt DateTime?\n  scope                 String?\n  password              String?\n  createdAt             DateTime  @default(now())\n  updatedAt             DateTime  @updatedAt\n\n  @@index([userId])\n  @@map("account")\n}\n\nmodel Verification {\n  id         String   @id\n  identifier String\n  value      String\n  expiresAt  DateTime\n  createdAt  DateTime @default(now())\n  updatedAt  DateTime @updatedAt\n\n  @@index([identifier])\n  @@map("verification")\n}\n\nmodel Comments {\n  id        String       @id @default(uuid())\n  content   String\n  status    commentSatus @default(APPROVED)\n  author_Id String\n\n  post    Posts  @relation(fields: [post_Id], references: [id], onDelete: Cascade)\n  post_Id String\n\n  parent    Comments?  @relation("CommentReplies", fields: [parent_Id], references: [id], onDelete: Cascade)\n  parent_Id String?\n  replies   Comments[] @relation("CommentReplies")\n\n  created_At DateTime @default(now())\n  updated_At DateTime @updatedAt\n\n  @@index([author_Id])\n  @@index([post_Id])\n  @@map("comments")\n}\n\nenum commentSatus {\n  APPROVED\n  REJECTED\n}\n\nmodel Posts {\n  id         String     @id @default(uuid())\n  title      String     @db.VarChar(255)\n  content    String     @db.Text\n  thumbnail  String?\n  isFeatured Boolean?   @default(false)\n  status     postStatus @default(PUBLISHED)\n  tags       String[]\n  views      Int?       @default(0)\n  author_Id  String\n  created_At DateTime   @default(now())\n  updated_At DateTime   @updatedAt\n  comments   Comments[]\n\n  @@index([author_Id])\n  @@map("posts")\n}\n\nenum postStatus {\n  PUBLISHED\n  DRAFT\n  ARCHIVE\n}\n\ngenerator client {\n  provider = "prisma-client"\n  output   = "../../generated/prisma"\n}\n\ndatasource db {\n  provider = "postgresql"\n}\n',
  "runtimeDataModel": {
    "models": {},
    "enums": {},
    "types": {}
  },
  "parameterizationSchema": {
    "strings": [],
    "graph": ""
  }
};
config.runtimeDataModel = JSON.parse('{"models":{"User":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"emailVerified","kind":"scalar","type":"Boolean"},{"name":"image","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"sessions","kind":"object","type":"Session","relationName":"SessionToUser"},{"name":"accounts","kind":"object","type":"Account","relationName":"AccountToUser"},{"name":"role","kind":"scalar","type":"String"},{"name":"phone","kind":"scalar","type":"String"},{"name":"status","kind":"scalar","type":"String"}],"dbName":"user"},"Session":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"expiresAt","kind":"scalar","type":"DateTime"},{"name":"token","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"ipAddress","kind":"scalar","type":"String"},{"name":"userAgent","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"SessionToUser"}],"dbName":"session"},"Account":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"accountId","kind":"scalar","type":"String"},{"name":"providerId","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"AccountToUser"},{"name":"accessToken","kind":"scalar","type":"String"},{"name":"refreshToken","kind":"scalar","type":"String"},{"name":"idToken","kind":"scalar","type":"String"},{"name":"accessTokenExpiresAt","kind":"scalar","type":"DateTime"},{"name":"refreshTokenExpiresAt","kind":"scalar","type":"DateTime"},{"name":"scope","kind":"scalar","type":"String"},{"name":"password","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"account"},"Verification":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"identifier","kind":"scalar","type":"String"},{"name":"value","kind":"scalar","type":"String"},{"name":"expiresAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"verification"},"Comments":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"content","kind":"scalar","type":"String"},{"name":"status","kind":"enum","type":"commentSatus"},{"name":"author_Id","kind":"scalar","type":"String"},{"name":"post","kind":"object","type":"Posts","relationName":"CommentsToPosts"},{"name":"post_Id","kind":"scalar","type":"String"},{"name":"parent","kind":"object","type":"Comments","relationName":"CommentReplies"},{"name":"parent_Id","kind":"scalar","type":"String"},{"name":"replies","kind":"object","type":"Comments","relationName":"CommentReplies"},{"name":"created_At","kind":"scalar","type":"DateTime"},{"name":"updated_At","kind":"scalar","type":"DateTime"}],"dbName":"comments"},"Posts":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"title","kind":"scalar","type":"String"},{"name":"content","kind":"scalar","type":"String"},{"name":"thumbnail","kind":"scalar","type":"String"},{"name":"isFeatured","kind":"scalar","type":"Boolean"},{"name":"status","kind":"enum","type":"postStatus"},{"name":"tags","kind":"scalar","type":"String"},{"name":"views","kind":"scalar","type":"Int"},{"name":"author_Id","kind":"scalar","type":"String"},{"name":"created_At","kind":"scalar","type":"DateTime"},{"name":"updated_At","kind":"scalar","type":"DateTime"},{"name":"comments","kind":"object","type":"Comments","relationName":"CommentsToPosts"}],"dbName":"posts"}},"enums":{},"types":{}}');
config.parameterizationSchema = {
  strings: JSON.parse('["where","orderBy","cursor","user","sessions","accounts","_count","User.findUnique","User.findUniqueOrThrow","User.findFirst","User.findFirstOrThrow","User.findMany","data","User.createOne","User.createMany","User.createManyAndReturn","User.updateOne","User.updateMany","User.updateManyAndReturn","create","update","User.upsertOne","User.deleteOne","User.deleteMany","having","_min","_max","User.groupBy","User.aggregate","Session.findUnique","Session.findUniqueOrThrow","Session.findFirst","Session.findFirstOrThrow","Session.findMany","Session.createOne","Session.createMany","Session.createManyAndReturn","Session.updateOne","Session.updateMany","Session.updateManyAndReturn","Session.upsertOne","Session.deleteOne","Session.deleteMany","Session.groupBy","Session.aggregate","Account.findUnique","Account.findUniqueOrThrow","Account.findFirst","Account.findFirstOrThrow","Account.findMany","Account.createOne","Account.createMany","Account.createManyAndReturn","Account.updateOne","Account.updateMany","Account.updateManyAndReturn","Account.upsertOne","Account.deleteOne","Account.deleteMany","Account.groupBy","Account.aggregate","Verification.findUnique","Verification.findUniqueOrThrow","Verification.findFirst","Verification.findFirstOrThrow","Verification.findMany","Verification.createOne","Verification.createMany","Verification.createManyAndReturn","Verification.updateOne","Verification.updateMany","Verification.updateManyAndReturn","Verification.upsertOne","Verification.deleteOne","Verification.deleteMany","Verification.groupBy","Verification.aggregate","comments","post","parent","replies","Comments.findUnique","Comments.findUniqueOrThrow","Comments.findFirst","Comments.findFirstOrThrow","Comments.findMany","Comments.createOne","Comments.createMany","Comments.createManyAndReturn","Comments.updateOne","Comments.updateMany","Comments.updateManyAndReturn","Comments.upsertOne","Comments.deleteOne","Comments.deleteMany","Comments.groupBy","Comments.aggregate","Posts.findUnique","Posts.findUniqueOrThrow","Posts.findFirst","Posts.findFirstOrThrow","Posts.findMany","Posts.createOne","Posts.createMany","Posts.createManyAndReturn","Posts.updateOne","Posts.updateMany","Posts.updateManyAndReturn","Posts.upsertOne","Posts.deleteOne","Posts.deleteMany","_avg","_sum","Posts.groupBy","Posts.aggregate","AND","OR","NOT","id","title","content","thumbnail","isFeatured","postStatus","status","tags","views","author_Id","created_At","updated_At","equals","in","notIn","lt","lte","gt","gte","not","has","hasEvery","hasSome","contains","startsWith","endsWith","every","some","none","commentSatus","post_Id","parent_Id","identifier","value","expiresAt","createdAt","updatedAt","accountId","providerId","userId","accessToken","refreshToken","idToken","accessTokenExpiresAt","refreshTokenExpiresAt","scope","password","token","ipAddress","userAgent","name","email","emailVerified","image","role","phone","is","isNot","connectOrCreate","upsert","createMany","set","disconnect","delete","connect","updateMany","deleteMany","increment","decrement","multiply","divide","push"]'),
  graph: "1QI2YA8EAADVAQAgBQAA1gEAIHMAANMBADB0AAAOABB1AADTAQAwdgEAAAABfAEAugEAIZkBQAC-AQAhmgFAAL4BACGoAQEAuQEAIakBAQAAAAGqASAA1AEAIasBAQC6AQAhrAEBALoBACGtAQEAugEAIQEAAAABACAMAwAA2QEAIHMAANoBADB0AAADABB1AADaAQAwdgEAuQEAIZgBQAC-AQAhmQFAAL4BACGaAUAAvgEAIZ0BAQC5AQAhpQEBALkBACGmAQEAugEAIacBAQC6AQAhAwMAAL0CACCmAQAA2wEAIKcBAADbAQAgDAMAANkBACBzAADaAQAwdAAAAwAQdQAA2gEAMHYBAAAAAZgBQAC-AQAhmQFAAL4BACGaAUAAvgEAIZ0BAQC5AQAhpQEBAAAAAaYBAQC6AQAhpwEBALoBACEDAAAAAwAgAQAABAAwAgAABQAgEQMAANkBACBzAADXAQAwdAAABwAQdQAA1wEAMHYBALkBACGZAUAAvgEAIZoBQAC-AQAhmwEBALkBACGcAQEAuQEAIZ0BAQC5AQAhngEBALoBACGfAQEAugEAIaABAQC6AQAhoQFAANgBACGiAUAA2AEAIaMBAQC6AQAhpAEBALoBACEIAwAAvQIAIJ4BAADbAQAgnwEAANsBACCgAQAA2wEAIKEBAADbAQAgogEAANsBACCjAQAA2wEAIKQBAADbAQAgEQMAANkBACBzAADXAQAwdAAABwAQdQAA1wEAMHYBAAAAAZkBQAC-AQAhmgFAAL4BACGbAQEAuQEAIZwBAQC5AQAhnQEBALkBACGeAQEAugEAIZ8BAQC6AQAhoAEBALoBACGhAUAA2AEAIaIBQADYAQAhowEBALoBACGkAQEAugEAIQMAAAAHACABAAAIADACAAAJACABAAAAAwAgAQAAAAcAIAEAAAABACAPBAAA1QEAIAUAANYBACBzAADTAQAwdAAADgAQdQAA0wEAMHYBALkBACF8AQC6AQAhmQFAAL4BACGaAUAAvgEAIagBAQC5AQAhqQEBALkBACGqASAA1AEAIasBAQC6AQAhrAEBALoBACGtAQEAugEAIQYEAAC7AgAgBQAAvAIAIHwAANsBACCrAQAA2wEAIKwBAADbAQAgrQEAANsBACADAAAADgAgAQAADwAwAgAAAQAgAwAAAA4AIAEAAA8AMAIAAAEAIAMAAAAOACABAAAPADACAAABACAMBAAAuQIAIAUAALoCACB2AQAAAAF8AQAAAAGZAUAAAAABmgFAAAAAAagBAQAAAAGpAQEAAAABqgEgAAAAAasBAQAAAAGsAQEAAAABrQEBAAAAAQEMAAATACAKdgEAAAABfAEAAAABmQFAAAAAAZoBQAAAAAGoAQEAAAABqQEBAAAAAaoBIAAAAAGrAQEAAAABrAEBAAAAAa0BAQAAAAEBDAAAFQAwAQwAABUAMAwEAACfAgAgBQAAoAIAIHYBAOEBACF8AQDiAQAhmQFAAOcBACGaAUAA5wEAIagBAQDhAQAhqQEBAOEBACGqASAAngIAIasBAQDiAQAhrAEBAOIBACGtAQEA4gEAIQIAAAABACAMAAAYACAKdgEA4QEAIXwBAOIBACGZAUAA5wEAIZoBQADnAQAhqAEBAOEBACGpAQEA4QEAIaoBIACeAgAhqwEBAOIBACGsAQEA4gEAIa0BAQDiAQAhAgAAAA4AIAwAABoAIAIAAAAOACAMAAAaACADAAAAAQAgEwAAEwAgFAAAGAAgAQAAAAEAIAEAAAAOACAHBgAAmwIAIBkAAJ0CACAaAACcAgAgfAAA2wEAIKsBAADbAQAgrAEAANsBACCtAQAA2wEAIA1zAADPAQAwdAAAIQAQdQAAzwEAMHYBAKMBACF8AQCkAQAhmQFAAKkBACGaAUAAqQEAIagBAQCjAQAhqQEBAKMBACGqASAA0AEAIasBAQCkAQAh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_AQAgcwAAxAEAMHQAAGsAEHUAAMQBADB2AQAAAAF4AQC5AQAhfAAAxQGUASJ_AQC5AQAhgAFAAL4BACGBAUAAvgEAIZQBAQC5AQAhlQEBALoBACEBAAAAaQAgDk4AAMYBACBPAADHAQAgUAAAvwEAIHMAAMQBADB0AABrABB1AADEAQAwdgEAuQEAIXgBALkBACF8AADFAZQBIn8BALkBACGAAUAAvgEAIYEBQAC-AQAhlAEBALkBACGVAQEAugEAIQROAACLAgAgTwAAjAIAIFAAAIcCACCVAQAA2wEAIAMAAABrACABAABsADACAABpACABAAAAawAgAQAAAGsAIAMAAABrACABAABsADACAABpACABAAAAawAgAQAAAGkAIAMAAABrACABAABsADACAABpACADAAAAawAgAQAAbAAwAgAAaQAgAwAAAGsAIAEAAGwAMAIAAGkAIAtOAACBAgAgTwAAhAIAIFAAAIICACB2AQAAAAF4AQAAAAF8AAAAlAECfwEAAAABgAFAAAAAAYEBQAAAAAGUAQEAAAABlQEBAAAAAQEMAAB2ACAIdgEAAAABeAEAAAABfAAAAJQBAn8BAAAAAYABQAAAAAGBAUAAAAABlAEBAAAAAZUBAQAAAAEBDAAAeAAwAQwAAHgAMAEAAABrACALTgAA_wEAIE8AAPUBACBQAAD2AQAgdgEA4QEAIXgBAOEBACF8AADzAZQBIn8BAOEBACGAAUAA5wEAIYEBQADnAQAhlAEBAOEBACGVAQEA4gEAIQIAAABpACAMAAB8ACAIdgEA4QEAIXgBAOEBACF8AADzAZQBIn8BAOEBACGAAUAA5wEAIYEBQADnAQAhlAEBAOEBACGVAQEA4gEAIQIAAABrACAMAAB-ACACAAAAawAgDAAAfgAgAQAAAGsAIAMAAABpACATAAB2ACAUAAB8ACABAAAAaQAgAQAAAGsAIAQGAACIAgAgGQAAigIAIBoAAIkCACCVAQAA2wEAIAtzAADAAQAwdAAAhgEAEHUAAMABADB2AQCjAQAheAEAowEAIXwAAMEBlAEifwEAowEAIYABQACpAQAhgQFAAKkBACGUAQEAowEAIZUBAQCkAQAhAwAAAGsAIAEAAIUBADAYAACGAQAgAwAAAGsAIAEAAGwAMAIAAGkAIA9NAAC_AQAgcwAAuAEAMHQAAIwBABB1AAC4AQAwdgEAAAABdwEAuQEAIXgBALkBACF5AQC6AQAheiAAuwEAIXwAALwBfCJ9AACnAQAgfgIAvQEAIX8BALkBACGAAUAAvgEAIYEBQAC-AQAhAQAAAIkBACABAAAAiQEAIA9NAAC_AQAgcwAAuAEAMHQAAIwBABB1AAC4AQAwdgEAuQEAIXcBALkBACF4AQC5AQAheQEAugEAIXogALsBACF8AAC8AXwifQAApwEAIH4CAL0BACF_AQC5AQAhgAFAAL4BACGBAUAAvgEAIQRNAACHAgAgeQAA2wEAIHoAANsBACB-AADbAQAgAwAAAIwBACABAACNAQAwAgAAiQEAIAMAAACMAQAgAQAAjQEAMAIAAIkBACADAAAAjAEAIAEAAI0BADACAACJAQAgDE0AAIYCACB2AQAAAAF3AQAAAAF4AQAAAAF5AQAAAAF6IAAAAAF8AAAAfAJ9AACFAgAgfgIAAAABfwEAAAABgAFAAAAAAYEBQAAAAAEBDAAAkQEAIAt2AQAAAAF3AQAAAAF4AQAAAAF5AQAAAAF6IAAAAAF8AAAAfAJ9AACFAgAgfgIAAAABfwEAAAABgAFAAAAAAYEBQAAAAAEBDAAAkwEAMAEMAACTAQAwDE0AAOgBACB2AQDhAQAhdwEA4QEAIXgBAOEBACF5AQDiAQAheiAA4wEAIXwAAOQBfCJ9AADlAQAgfgIA5gEAIX8BAOEBACGAAUAA5wEAIYEBQADnAQAhAgAAAIkBACAMAACWAQAgC3YBAOEBACF3AQDhAQAheAEA4QEAIXkBAOIBACF6IADjAQAhfAAA5AF8In0AAOUBACB-AgDmAQAhfwEA4QEAIYABQADnAQAhgQFAAOcBACECAAAAjAEAIAwAAJgBACACAAAAjAEAIAwAAJgBACADAAAAiQEAIBMAAJEBACAUAACWAQAgAQAAAIkBACABAAAAjAEAIAgGAADcAQAgGQAA3wEAIBoAAN4BACBvAADdAQAgcAAA4AEAIHkAANsBACB6AADbAQAgfgAA2wEAIA5zAACiAQAwdAAAnwEAEHUAAKIBADB2AQCjAQAhdwEAowEAIXgBAKMBACF5AQCkAQAheiAApQEAIXwAAKYBfCJ9AACnAQAgfgIAqAEAIX8BAKMBACGAAUAAqQEAIYEBQACpAQAhAwAAAIwBACABAACeAQAwGAAAnwEAIAMAAACMAQAgAQAAjQEAMAIAAIkBACAOcwAAogEAMHQAAJ8BABB1AACiAQAwdgEAowEAIXcBAKMBACF4AQCjAQAheQEApAEAIXogAKUBACF8AACmAXwifQAApwEAIH4CAKgBACF_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_AQCjAQAhgAFAAKkBACGBAUAAqQEAIZQBAQCjAQAhlQEBAKQBACEHBgAAqwEAIBkAAMMBACAaAADDAQAgggEAAACUAQKDAQAAAJQBCIQBAAAAlAEIiQEAAMIBlAEiBwYAAKsBACAZAADDAQAgGgAAwwEAIIIBAAAAlAECgwEAAACUAQiEAQAAAJQBCIkBAADCAZQBIgSCAQAAAJQBAoMBAAAAlAEIhAEAAACUAQiJAQAAwwGUASIOTgAAxgEAIE8AAMcBACBQAAC_AQAgcwAAxAEAMHQAAGsAEHUAAMQBADB2AQC5AQAheAEAuQEAIXwAAMUBlAEifwEAuQEAIYABQAC-AQAhgQFAAL4BACGUAQEAuQEAIZUBAQC6AQAhBIIBAAAAlAECgwEAAACUAQiEAQAAAJQBCIkBAADDAZQBIhFNAAC_AQAgcwAAuAEAMHQAAIwBABB1AAC4AQAwdgEAuQEAIXcBALkBACF4AQC5AQAheQEAugEAIXogALsBACF8AAC8AXwifQAApwEAIH4CAL0BACF_AQC5AQAhgAFAAL4BACGBAUAAvgEAIa4BAACMAQAgrwEAAIwBACAQTgAAxgEAIE8AAMcBACBQAAC_AQAgcwAAxAEAMHQAAGsAEHUAAMQBADB2AQC5AQAheAEAuQEAIXwAAMUBlAEifwEAuQEAIYABQAC-AQAhgQFAAL4BACGUAQEAuQEAIZUBAQC6AQAhrgEAAGsAIK8BAABrACAJcwAAyAEAMHQAAGYAEHUAAMgBADB2AQCjAQAhlgEBAKMBACGXAQEAowEAIZgBQACpAQAhmQFAAKkBACGaAUAAqQEAIQlzAADJAQAwdAAAUwAQdQAAyQEAMHYBALkBACGWAQEAuQEAIZcBAQC5AQAhmAFAAL4BACGZAUAAvgEAIZoBQAC-AQAhEHMAAMoBADB0AABNABB1AADKAQAwdgEAowEAIZkBQACpAQAhmgFAAKkBACGbAQEAowEAIZwBAQCjAQAhnQEBAKMBACGeAQEApAEAIZ8BAQCkAQAhoAEBAKQBACGhAUAAywEAIaIBQADLAQAhowEBAKQBACGkAQEApAEAIQsGAACuAQAgGQAAzQEAIBoAAM0BACCCAUAAAAABgwFAAAAABYQBQAAAAAWFAUAAAAABhgFAAAAAAYcBQAAAAAGIAUAAAAABiQFAAMwBACELBgAArgEAIBkAAM0BACAaAADNAQAgggFAAAAAAYMBQAAAAAWEAUAAAAAFhQFAAAAAAYYBQAAAAAGHAUAAAAABiAFAAAAAAYkBQADMAQAhCIIBQAAAAAGDAUAAAAAFhAFAAAAABYUBQAAAAAGGAUAAAAABhwFAAAAAAYgBQAAAAAGJAUAAzQEAIQtzAADOAQAwdAAANwAQdQAAzgEAMHYBAKMBACGYAUAAqQEAIZkBQACpAQAhmgFAAKkBACGdAQEAowEAIaUBAQCjAQAhpgEBAKQBACGnAQEApAEAIQ1zAADPAQAwdAAAIQAQdQAAzwEAMHYBAKMBACF8AQCkAQAhmQFAAKkBACGaAUAAqQEAIagBAQCjAQAhqQEBAKMBACGqASAA0AEAIasBAQCkAQAhrAEBAKQBACGtAQEApAEAIQUGAACrAQAgGQAA0gEAIBoAANIBACCCASAAAAABiQEgANEBACEFBgAAqwEAIBkAANIBACAaAADSAQAgggEgAAAAAYkBIADRAQAhAoIBIAAAAAGJASAA0gEAIQ8EAADVAQAgBQAA1gEAIHMAANMBADB0AAAOABB1AADTAQAwdgEAuQEAIXwBALoBACGZAUAAvgEAIZoBQAC-AQAhqAEBALkBACGpAQEAuQEAIaoBIADUAQAhqwEBALoBACGsAQEAugEAIa0BAQC6AQAhAoIBIAAAAAGJASAA0gEAIQOQAQAAAwAgkQEAAAMAIJIBAAADACADkAEAAAcAIJEBAAAHACCSAQAABwAgEQMAANkBACBzAADXAQAwdAAABwAQdQAA1wEAMHYBALkBACGZAUAAvgEAIZoBQAC-AQAhmwEBALkBACGcAQEAuQEAIZ0BAQC5AQAhngEBALoBACGfAQEAugEAIaABAQC6AQAhoQFAANgBACGiAUAA2AEAIaMBAQC6AQAhpAEBALoBACEIggFAAAAAAYMBQAAAAAWEAUAAAAAFhQFAAAAAAYYBQAAAAAGHAUAAAAABiAFAAAAAAYkBQADNAQAhEQQAANUBACAFAADWAQAgcwAA0wEAMHQAAA4AEHUAANMBADB2AQC5AQAhfAEAugEAIZkBQAC-AQAhmgFAAL4BACGoAQEAuQEAIakBAQC5AQAhqgEgANQBACGrAQEAugEAIawBAQC6AQAhrQEBALoBACGuAQAADgAgrwEAAA4AIAwDAADZAQAgcwAA2gEAMHQAAAMAEHUAANoBADB2AQC5AQAhmAFAAL4BACGZAUAAvgEAIZoBQAC-AQAhnQEBALkBACGlAQEAuQEAIaYBAQC6AQAhpwEBALoBACEAAAAAAAABswEBAAAAAQGzAQEAAAABAbMBIAAAAAEBswEAAAB8AgKzAQEAAAAEvQEBAAAABQWzAQIAAAABuQECAAAAAboBAgAAAAG7AQIAAAABvAECAAAAAQGzAUAAAAABCxMAAOkBADAUAADuAQAwsAEAAOoBADCxAQAA6wEAMLIBAADsAQAgswEAAO0BADC0AQAA7QEAMLUBAADtAQAwtgEAAO0BADC3AQAA7wEAMLgBAADwAQAwCU8AAIQCACBQAACCAgAgdgEAAAABeAEAAAABfAAAAJQBAn8BAAAAAYABQAAAAAGBAUAAAAABlQEBAAAAAQIAAABpACATAACDAgAgAwAAAGkAIBMAAIMCACAUAAD0AQAgAQwAANUCADAOTgAAxgEAIE8AAMcBACBQAAC_AQAgcwAAxAEAMHQAAGsAEHUAAMQBADB2AQAAAAF4AQC5AQAhfAAAxQGUASJ_AQC5AQAhgAFAAL4BACGBAUAAvgEAIZQBAQC5AQAhlQEBALoBACECAAAAaQAgDAAA9AEAIAIAAADxAQAgDAAA8gEAIAtzAADwAQAwdAAA8QEAEHUAAPABADB2AQC5AQAheAEAuQEAIXwAAMUBlAEifwEAuQEAIYABQAC-AQAhgQFAAL4BACGUAQEAuQEAIZUBAQC6AQAhC3MAAPABADB0AADxAQAQdQAA8AEAMHYBALkBACF4AQC5AQAhfAAAxQGUASJ_AQC5AQAhgAFAAL4BACGBAUAAvgEAIZQBAQC5AQAhlQEBALoBACEHdgEA4QEAIXgBAOEBACF8AADzAZQBIn8BAOEBACGAAUAA5wEAIYEBQADnAQAhlQEBAOIBACEBswEAAACUAQIJTwAA9QEAIFAAAPYBACB2AQDhAQAheAEA4QEAIXwAAPMBlAEifwEA4QEAIYABQADnAQAhgQFAAOcBACGVAQEA4gEAIQcTAADKAgAgFAAA0wIAILABAADLAgAgsQEAANICACC0AQAAawAgtQEAAGsAILYBAABpACALEwAA9wEAMBQAAPsBADCwAQAA-AEAMLEBAAD5AQAwsgEAAPoBACCzAQAA7QEAMLQBAADtAQAwtQEAAO0BADC2AQAA7QEAMLcBAAD8AQAwuAEAAPABADAJTgAAgQIAIFAAAIICACB2AQAAAAF4AQAAAAF8AAAAlAECfwEAAAABgAFAAAAAAYEBQAAAAAGUAQEAAAABAgAAAGkAIBMAAIACACADAAAAaQAgEwAAgAIAIBQAAP4BACABDAAA0QIAMAIAAABpACAMAAD-AQAgAgAAAPEBACAMAAD9AQAgB3YBAOEBACF4AQDhAQAhfAAA8wGUASJ_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_AQDhAQAhgAFAAOcBACGBAUAA5wEAIQt2AQDhAQAhdwEA4QEAIXgBAOEBACF5AQDiAQAheiAA4wEAIXwAAOQBfCJ9AADlAQAgfgIA5gEAIX8BAOEBACGAAUAA5wEAIYEBQADnAQAhB3YBAAAAAXgBAAAAAXwAAACUAQJ_AQAAAAGAAUAAAAABgQFAAAAAAZQBAQAAAAEDAAAAawAgEwAAygIAIBQAANQCACAMAAAAawAgDAAA1AIAIE4AAP8BACBPAAD1AQAgdgEA4QEAIXgBAOEBACF8AADzAZQBIn8BAOEBACGAAUAA5wEAIYEBQADnAQAhlAEBAOEBACGVAQEA4gEAIQpOAAD_AQAgTwAA9QEAIHYBAOEBACF4AQDhAQAhfAAA8wGUASJ_AQDhAQAhgAFAAOcBACGBAUAA5wEAIZQBAQDhAQAhlQEBAOIBACEHdgEAAAABeAEAAAABfAAAAJQBAn8BAAAAAYABQAAAAAGBAUAAAAABlQEBAAAAAQMEBgIFCgMGAAQBAwABAQMAAQIECwAFDAAAAAADBgAJGQAKGgALAAAAAwYACRkAChoACwEDAAEBAwABAwYAEBkAERoAEgAAAAMGABAZABEaABIBAwABAQMAAQMGABcZABgaABkAAAADBgAXGQAYGgAZAAAAAwYAHxkAIBoAIQAAAAMGAB8ZACAaACEEBgAmTgAkT28jUHAjAgYAJU1tIwFNbgABUHEAAk4AJE97IwJOACRPgQEjAwYAKhkAKxoALAAAAAMGACoZACsaACwAAAUGADEZADQaADVvADJwADMAAAAAAAUGADEZADQaADVvADJwADMHAgEIDQEJEAEKEQELEgENFAEOFgUPFwYQGQERGwUSHAcVHQEWHgEXHwUbIggcIwwdJAIeJQIfJgIgJwIhKAIiKgIjLAUkLQ0lLwImMQUnMg4oMwIpNAIqNQUrOA8sORMtOgMuOwMvPAMwPQMxPgMyQAMzQgU0QxQ1RQM2RwU3SBU4SQM5SgM6SwU7ThY8Txo9URs-Uhs_VRtAVhtBVxtCWRtDWwVEXBxFXhtGYAVHYR1IYhtJYxtKZAVLZx5MaCJRaiNSciNTcyNUdCNVdSNWdyNXeQVYeidZfSNafwVbgAEoXIIBI12DASNehAEFX4cBKWCIAS1higEkYosBJGOOASRkjwEkZZABJGaSASRnlAEFaJUBLmmXASRqmQEFa5oBL2ybASRtnAEkbp0BBXGgATByoQE2"
};
async function decodeBase64AsWasm(wasmBase64) {
  const { Buffer: Buffer2 } = await import("buffer");
  const wasmArray = Buffer2.from(wasmBase64, "base64");
  return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
  getRuntime: async () => await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.mjs"),
  getQueryCompilerWasmModule: async () => {
    const { wasm } = await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.mjs");
    return await decodeBase64AsWasm(wasm);
  },
  importName: "./query_compiler_fast_bg.js"
};
function getPrismaClientClass() {
  return runtime.getPrismaClient(config);
}

// generated/prisma/internal/prismaNamespace.ts
var prismaNamespace_exports = {};
__export(prismaNamespace_exports, {
  AccountScalarFieldEnum: () => AccountScalarFieldEnum,
  AnyNull: () => AnyNull2,
  CommentsScalarFieldEnum: () => CommentsScalarFieldEnum,
  DbNull: () => DbNull2,
  Decimal: () => Decimal2,
  JsonNull: () => JsonNull2,
  ModelName: () => ModelName,
  NullTypes: () => NullTypes2,
  NullsOrder: () => NullsOrder,
  PostsScalarFieldEnum: () => PostsScalarFieldEnum,
  PrismaClientInitializationError: () => PrismaClientInitializationError2,
  PrismaClientKnownRequestError: () => PrismaClientKnownRequestError2,
  PrismaClientRustPanicError: () => PrismaClientRustPanicError2,
  PrismaClientUnknownRequestError: () => PrismaClientUnknownRequestError2,
  PrismaClientValidationError: () => PrismaClientValidationError2,
  QueryMode: () => QueryMode,
  SessionScalarFieldEnum: () => SessionScalarFieldEnum,
  SortOrder: () => SortOrder,
  Sql: () => Sql2,
  TransactionIsolationLevel: () => TransactionIsolationLevel,
  UserScalarFieldEnum: () => UserScalarFieldEnum,
  VerificationScalarFieldEnum: () => VerificationScalarFieldEnum,
  defineExtension: () => defineExtension,
  empty: () => empty2,
  getExtensionContext: () => getExtensionContext,
  join: () => join2,
  prismaVersion: () => prismaVersion,
  raw: () => raw2,
  sql: () => sql
});
import * as runtime2 from "@prisma/client/runtime/client";
var PrismaClientKnownRequestError2 = runtime2.PrismaClientKnownRequestError;
var PrismaClientUnknownRequestError2 = runtime2.PrismaClientUnknownRequestError;
var PrismaClientRustPanicError2 = runtime2.PrismaClientRustPanicError;
var PrismaClientInitializationError2 = runtime2.PrismaClientInitializationError;
var PrismaClientValidationError2 = runtime2.PrismaClientValidationError;
var sql = runtime2.sqltag;
var empty2 = runtime2.empty;
var join2 = runtime2.join;
var raw2 = runtime2.raw;
var Sql2 = runtime2.Sql;
var Decimal2 = runtime2.Decimal;
var getExtensionContext = runtime2.Extensions.getExtensionContext;
var prismaVersion = {
  client: "7.4.1",
  engine: "55ae170b1ced7fc6ed07a15f110549408c501bb3"
};
var NullTypes2 = {
  DbNull: runtime2.NullTypes.DbNull,
  JsonNull: runtime2.NullTypes.JsonNull,
  AnyNull: runtime2.NullTypes.AnyNull
};
var DbNull2 = runtime2.DbNull;
var JsonNull2 = runtime2.JsonNull;
var AnyNull2 = runtime2.AnyNull;
var ModelName = {
  User: "User",
  Session: "Session",
  Account: "Account",
  Verification: "Verification",
  Comments: "Comments",
  Posts: "Posts"
};
var TransactionIsolationLevel = runtime2.makeStrictEnum({
  ReadUncommitted: "ReadUncommitted",
  ReadCommitted: "ReadCommitted",
  RepeatableRead: "RepeatableRead",
  Serializable: "Serializable"
});
var UserScalarFieldEnum = {
  id: "id",
  name: "name",
  email: "email",
  emailVerified: "emailVerified",
  image: "image",
  createdAt: "createdAt",
  updatedAt: "updatedAt",
  role: "role",
  phone: "phone",
  status: "status"
};
var SessionScalarFieldEnum = {
  id: "id",
  expiresAt: "expiresAt",
  token: "token",
  createdAt: "createdAt",
  updatedAt: "updatedAt",
  ipAddress: "ipAddress",
  userAgent: "userAgent",
  userId: "userId"
};
var AccountScalarFieldEnum = {
  id: "id",
  accountId: "accountId",
  providerId: "providerId",
  userId: "userId",
  accessToken: "accessToken",
  refreshToken: "refreshToken",
  idToken: "idToken",
  accessTokenExpiresAt: "accessTokenExpiresAt",
  refreshTokenExpiresAt: "refreshTokenExpiresAt",
  scope: "scope",
  password: "password",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var VerificationScalarFieldEnum = {
  id: "id",
  identifier: "identifier",
  value: "value",
  expiresAt: "expiresAt",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var CommentsScalarFieldEnum = {
  id: "id",
  content: "content",
  status: "status",
  author_Id: "author_Id",
  post_Id: "post_Id",
  parent_Id: "parent_Id",
  created_At: "created_At",
  updated_At: "updated_At"
};
var PostsScalarFieldEnum = {
  id: "id",
  title: "title",
  content: "content",
  thumbnail: "thumbnail",
  isFeatured: "isFeatured",
  status: "status",
  tags: "tags",
  views: "views",
  author_Id: "author_Id",
  created_At: "created_At",
  updated_At: "updated_At"
};
var SortOrder = {
  asc: "asc",
  desc: "desc"
};
var QueryMode = {
  default: "default",
  insensitive: "insensitive"
};
var NullsOrder = {
  first: "first",
  last: "last"
};
var defineExtension = runtime2.Extensions.defineExtension;

// generated/prisma/enums.ts
var commentSatus = {
  APPROVED: "APPROVED",
  REJECTED: "REJECTED"
};
var postStatus = {
  PUBLISHED: "PUBLISHED",
  DRAFT: "DRAFT",
  ARCHIVE: "ARCHIVE"
};

// generated/prisma/client.ts
globalThis["__dirname"] = path.dirname(fileURLToPath(import.meta.url));
var PrismaClient = getPrismaClientClass();

// src/lib/prisma.ts
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
var connectionString = `${process.env.DATABASE_URL}`;
var adapter = new PrismaPg({ connectionString });
var prisma = new PrismaClient({ adapter });

// src/modules/Posts/posts.services.ts
var createPost = async (payLoad, author_Id) => {
  const result = await prisma.posts.create({ data: { ...payLoad, author_Id } });
  return result;
};
var getAllPosts = async ({
  searchVal,
  tags,
  isFeatured,
  status,
  author_Id,
  page,
  limit,
  skip,
  sortby,
  sortorder
}) => {
  const andConditions = [];
  if (searchVal) {
    andConditions.push({
      OR: [
        {
          title: {
            contains: searchVal,
            mode: "insensitive"
          }
        },
        {
          content: {
            contains: searchVal,
            mode: "insensitive"
          }
        },
        {
          tags: {
            has: searchVal
          }
        }
      ]
    });
  }
  if (tags.length) {
    andConditions.push({
      tags: {
        hasEvery: tags
      }
    });
  }
  if (typeof isFeatured === "boolean") {
    andConditions.push({
      isFeatured
    });
  }
  if (status) {
    andConditions.push({
      status
    });
  }
  if (author_Id) {
    andConditions.push({
      author_Id
    });
  }
  const result = await prisma.posts.findMany({
    skip,
    take: limit,
    where: {
      AND: andConditions
    },
    orderBy: {
      [sortby]: sortorder
    },
    include: {
      comments: {
        where: {
          parent_Id: null,
          status: commentSatus.APPROVED
        },
        orderBy: {
          created_At: "desc"
        },
        include: {
          replies: {
            where: {
              status: commentSatus.APPROVED
            },
            orderBy: {
              created_At: "asc"
            },
            include: {
              replies: {
                where: {
                  status: commentSatus.APPROVED
                },
                orderBy: {
                  created_At: "asc"
                }
              }
            }
          }
        }
      },
      _count: {
        select: {
          comments: true
        }
      }
    }
  });
  const resultCount = await prisma.posts.count({
    where: {
      AND: andConditions
    }
  });
  if (resultCount === 0) {
    throw new Error("NO_POST_EXIST_YET");
  }
  const totalPages = Math.ceil(resultCount / limit);
  return { result, resultCount, page, limit, totalPages };
};
var getPostById = async (id) => {
  const result = await prisma.$transaction(async (tx) => {
    const post = await tx.posts.findUnique({
      where: {
        id
      }
    });
    if (!post) {
      throw new Error("POST_NOT_FOUND");
    }
    await tx.posts.update({
      where: {
        id
      },
      data: {
        views: {
          increment: 1
        }
      }
    });
    const outcome = await tx.posts.findUnique({
      where: {
        id
      },
      include: {
        comments: {
          where: {
            parent_Id: null,
            status: commentSatus.APPROVED
          },
          orderBy: {
            created_At: "desc"
          },
          include: {
            replies: {
              where: {
                status: commentSatus.APPROVED
              },
              orderBy: {
                created_At: "asc"
              },
              include: {
                replies: {
                  where: {
                    status: commentSatus.APPROVED
                  },
                  orderBy: {
                    created_At: "asc"
                  }
                }
              }
            }
          }
        },
        _count: {
          select: {
            comments: true
          }
        }
      }
    });
    return outcome;
  });
  return result;
};
var getMyPost = async (author_Id, sortby, sortorder) => {
  const post = await prisma.posts.findFirst({
    where: {
      author_Id
    }
  });
  if (!post) {
    throw new Error("NO_POST_CREATED_YET");
  }
  const result = await prisma.posts.findMany({
    where: {
      author_Id
    },
    orderBy: {
      [sortby]: sortorder
    },
    include: {
      _count: {
        select: {
          comments: true
        }
      }
    }
  });
  const postCount = await prisma.posts.aggregate({
    where: {
      author_Id
    },
    _count: {
      id: true
    }
  });
  return { result, postCount: postCount._count.id };
};
var updatePost = async (id, payLoad, author_Id, isAdmin) => {
  const isExist = await prisma.posts.findUnique({
    where: {
      id
    },
    select: {
      author_Id: true
    }
  });
  if (!isExist) {
    throw new Error("NO_SUCH_POST_EXIST_TO_UPDATE");
  }
  const omittedArray = [
    "id",
    "views",
    "author_Id",
    "created_At",
    "updated_At"
  ];
  omittedArray.forEach((omittedField) => {
    delete payLoad[omittedField];
  });
  if (!isAdmin) {
    if (author_Id !== isExist.author_Id) {
      throw new Error("You are not allowed to perform this action");
    }
    delete payLoad.isFeatured;
  }
  const result = await prisma.posts.update({
    where: {
      id
    },
    data: payLoad
  });
  return result;
};
var deletePost = async (id, author_Id, isAdmin) => {
  const isExist = await prisma.posts.findUnique({
    where: {
      id
    },
    select: {
      id: true,
      author_Id: true
    }
  });
  if (!isExist) {
    throw new Error("NO_SUCH_POST_EXIST_TO_DELETE");
  }
  if (!isAdmin && author_Id !== isExist.author_Id) {
    throw new Error("You are not allowed to perform this action");
  }
  const result = await prisma.posts.delete({
    where: {
      id
    }
  });
  return result;
};
var getStatistics = async () => {
  return await prisma.$transaction(async (tx) => {
    const [
      totalPosts,
      publishedPosts,
      draftPosts,
      archivedPosts,
      totalViewCount,
      totalComments,
      approvedComments,
      rejectedComments,
      totalUsers,
      adminsCount,
      userscount
    ] = await Promise.all([
      await tx.posts.count(),
      await tx.posts.count({ where: { status: postStatus.PUBLISHED } }),
      await tx.posts.count({ where: { status: postStatus.DRAFT } }),
      await tx.posts.count({ where: { status: postStatus.ARCHIVE } }),
      await tx.posts.aggregate({ _sum: { views: true } }),
      await tx.comments.count(),
      await tx.comments.count({ where: { status: commentSatus.APPROVED } }),
      await tx.comments.aggregate({
        where: { status: commentSatus.REJECTED },
        _count: { id: true }
      }),
      await tx.user.count(),
      await tx.user.aggregate({
        where: { role: "ADMIN" },
        _count: { id: true }
      }),
      await tx.user.count({ where: { role: "USER" } })
    ]);
    return {
      totalPosts,
      publishedPosts,
      draftPosts,
      archivedPosts,
      totalViewCount: totalViewCount._sum.views,
      totalComments,
      approvedComments,
      rejectedComments: rejectedComments._count.id,
      totalUsers,
      adminsCount: adminsCount._count.id,
      userscount
    };
  });
};
var postsServices = {
  createPost,
  getAllPosts,
  getPostById,
  getMyPost,
  updatePost,
  deletePost,
  getStatistics
};

// src/helpers/pagination&sortingHelper.ts
var pagination_sorting_Helper = (queryParams) => {
  const page = Number(queryParams.page) || 1;
  const limit = Number(queryParams.limit) || 5;
  const skip = (page - 1) * limit;
  const sortby = queryParams.sortby || "created_At";
  const sortorder = queryParams.sortorder || "desc";
  return { page, limit, skip, sortby, sortorder };
};
var pagination_sortingHelper_default = pagination_sorting_Helper;

// src/lib/auth.ts
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import nodemailer from "nodemailer";

// src/config/index.ts
import dotenv from "dotenv";
import path2 from "path";
dotenv.config({ path: path2.join(process.cwd(), ".env") });
var config2 = {
  port: process.env.PORT,
  BETTER_AUTH_URL: process.env.BETTER_AUTH_URL,
  APP_URL: process.env.APP_URL,
  PROD_APP_URL: process.env.PROD_APP_URL,
  APP_USER: process.env.APP_USER,
  APP_PASS: process.env.APP_PASS,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  SEED_ADMIN_NAME: process.env.SEED_ADMIN_NAME,
  SEED_ADMIN_EMAIL: process.env.SEED_ADMIN_EMAIL,
  SEED_ADMIN_PASS: process.env.SEED_ADMIN_PASS,
  SEED_ADMIN_ROLE: process.env.SEED_ADMIN_ROLE
};

// src/lib/auth.ts
var transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: config2.APP_USER,
    pass: config2.APP_PASS
  }
});
var auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql"
  }),
  trustedOrigins: async (request) => {
    const origin = request?.headers.get("origin");
    const allowedOrigins2 = [
      config2.APP_URL,
      config2.PROD_APP_URL,
      config2.BETTER_AUTH_URL,
      "http://localhost:3000",
      "http://localhost:5000"
    ].filter(Boolean);
    if (!origin || allowedOrigins2.includes(origin) || /^https:\/\/.*\.vercel\.app$/.test(origin)) {
      return [origin];
    }
    return [];
  },
  basePath: "/api/auth",
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 6 * 60
      // 6 minutes
    }
  },
  advanced: {
    cookiePrefix: "better-auth",
    useSecureCookies: process.env.NODE_ENV === "production",
    crossSubDomainCookies: {
      enabled: false
    },
    disableCSRFCheck: true
    // Allow requests without Origin header (Postman, mobile apps, etc.)
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "USER",
        required: false
      },
      phone: {
        type: "string",
        required: false
      },
      status: {
        type: "string",
        defaultValue: "ACTIVE",
        required: false
      }
    }
  },
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    requireEmailVerification: true
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url, token }, request) => {
      try {
        const verificationUrl = `${config2.APP_URL}/verify-email?token=${token}`;
        const info = await transporter.sendMail({
          from: `"Blog App"<${config2.APP_USER}>`,
          to: user.email,
          subject: "Please Verify Your Email !",
          html: `<!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Email Verification</title>
    <style>
      body {
        margin: 0;
        padding: 0;
        background-color: #f4f6f8;
        font-family: Arial, Helvetica, sans-serif;
      }

      .container {
        max-width: 600px;
        margin: 40px auto;
        background-color: #ffffff;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
      }

      .header {
        background-color: #2563eb;
        color: #ffffff;
        padding: 20px;
        text-align: center;
      }

      .header h1 {
        margin: 0;
        font-size: 24px;
      }

      .content {
        padding: 30px;
        color: #333333;
        line-height: 1.6;
      }

      .content h2 {
        margin-top: 0;
        font-size: 20px;
      }

      .button-wrapper {
        text-align: center;
        margin: 30px 0;
      }

      .verify-button {
        display: inline-block;
        background-color: #1e4ed8;
        color: white !important;
        padding: 14px 28px;
        text-decoration: none;
        font-size: 16px;
        border-radius: 6px;
        font-weight: bold;
      }

      .footer {
        background-color: #f9fafb;
        padding: 20px;
        font-size: 13px;
        color: #6b7280;
        text-align: center;
      }

      .footer a {
        color: #2563eb;
        text-decoration: none;
      }

      @media (max-width: 600px) {
        .content {
          padding: 20px;
        }
      }
    </style>
  </head>

  <body>
    <div class="container">
      <div class="header">
        <h1>Verify Your Email</h1>
      </div>

      <div class="content">
        <h2>Hello ${user.name},</h2>

        <p>
          Thank you for registering with <strong>Blog App</strong>.
          Please confirm your email address by clicking the button below.
        </p>

        <div class="button-wrapper">
          <a href="${verificationUrl}" class="verify-button">
            Verify Email
          </a>
        </div>

        <p>
          If the button above doesn\u2019t work, copy and paste the following link
          into your browser:
        </p>

        <p>
          <a href="${verificationUrl}">
            ${verificationUrl}
          </a>
        </p>

        <p>
          If you did not create an account, you can safely ignore this email.
        </p>

        <p>Best regards,<br />The Blog App Team</p>
      </div>

      <div class="footer">
        <p>
          \xA9 2026 Blog App. All rights reserved.
        </p>
      </div>
    </div>
  </body>
</html>
`
        });
      } catch (err) {
        console.log(err);
        throw err;
      }
    }
  },
  socialProviders: {
    google: {
      clientId: config2.GOOGLE_CLIENT_ID,
      clientSecret: config2.GOOGLE_CLIENT_SECRET,
      accessType: "offline",
      prompt: "select_account consent"
    }
  }
});

// src/middleware/auth.ts
var auth2 = (...role) => {
  return async (req, res, next) => {
    try {
      const session = await auth.api.getSession({
        headers: req.headers
      });
      if (!session) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized access"
        });
      }
      if (!session.user.emailVerified) {
        return res.status(403).json({
          success: false,
          message: "Forbidden! Please verify your email."
        });
      }
      req.user = {
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
        role: session.user.role,
        emailVarified: session.user.emailVerified,
        status: session.user.status
      };
      if (role.length && role.includes(req.user.role)) {
        return next();
      }
      return res.status(403).json({
        success: false,
        message: "You are not allowed to perform this action"
      });
    } catch (err) {
      next(err);
    }
  };
};
var auth_default = auth2;

// src/modules/Posts/posts.controllers.ts
var createPost2 = async (req, res, next) => {
  try {
    const user = req.user;
    const result = await postsServices.createPost(req.body, user?.id);
    res.status(201).json({
      success: true,
      message: "Post created succcessfully",
      data: result
    });
  } catch (err) {
    next(err);
  }
};
var getAllPosts2 = async (req, res, next) => {
  try {
    const search = req.query.search;
    const searchVal = typeof search === "string" ? search : void 0;
    const tags = req.query.tags ? req.query.tags.split(",") : [];
    const isFeaturedQyery = req.query.isFeatured;
    let isFeatured;
    if (typeof isFeaturedQyery === "string") {
      if (isFeaturedQyery === "true") {
        isFeatured = true;
      } else if (isFeaturedQyery === "false") {
        isFeatured = false;
      } else {
        return res.status(400).json({
          success: false,
          message: "Invalid value for isFeatured"
        });
      }
    }
    const status = req.query.status;
    const author_Id = req.query.author_Id;
    const { page, limit, skip, sortby, sortorder } = pagination_sortingHelper_default(
      req.query
    );
    const Result = await postsServices.getAllPosts({
      searchVal,
      tags,
      isFeatured,
      status,
      author_Id,
      page,
      limit,
      skip,
      sortby,
      sortorder
    });
    const { result, ...remaings } = Result;
    res.status(200).json({
      success: true,
      message: "Getting posts successfully",
      data: result,
      metaData: remaings
    });
  } catch (err) {
    next(err);
  }
};
var getPostById2 = async (req, res, next) => {
  try {
    const postId = req.params.id;
    if (!postId) {
      throw new Error("Post Id not used");
    }
    const result = await postsServices.getPostById(postId);
    res.status(200).json({
      success: true,
      message: "Post getting successfully",
      data: result
    });
  } catch (err) {
    next(err);
  }
};
var getMyPost2 = async (req, res, next) => {
  try {
    const user = req.user;
    if (!user || user.status !== "ACTIVE") {
      throw new Error("User not found");
    }
    const { sortby, sortorder } = pagination_sortingHelper_default(req.query);
    const { result, postCount } = await postsServices.getMyPost(
      user.id,
      sortby,
      sortorder
    );
    res.status(200).json({
      success: true,
      message: "Getting posts successfully",
      data: result,
      totalPosts: postCount
    });
  } catch (err) {
    next(err);
  }
};
var updatePost2 = async (req, res, next) => {
  try {
    const user = req.user;
    if (!user) {
      throw new Error("User not found");
    }
    const isAdmin = user.role === "ADMIN" /* ADMIN */;
    const result = await postsServices.updatePost(
      req.params.id,
      req.body,
      user.id,
      isAdmin
    );
    res.status(200).json({
      success: true,
      message: "Post updated successfully",
      data: result
    });
  } catch (err) {
    next(err);
  }
};
var deletePost2 = async (req, res, next) => {
  try {
    const user = req.user;
    if (!user) {
      throw new Error("User not found");
    }
    const isAdmin = user.role === "ADMIN" /* ADMIN */;
    const result = await postsServices.deletePost(
      req.params.id,
      user.id,
      isAdmin
    );
    res.status(200).json({
      success: true,
      message: "Post delete successfull",
      data: result
    });
  } catch (err) {
    next(err);
  }
};
var getStatistics2 = async (req, res, next) => {
  try {
    const result = await postsServices.getStatistics();
    res.status(200).json({
      success: true,
      message: "Getting statistics successful",
      data: result
    });
  } catch (err) {
    next(err);
  }
};
var postsControllers = {
  createPost: createPost2,
  getAllPosts: getAllPosts2,
  getPostById: getPostById2,
  getMyPost: getMyPost2,
  updatePost: updatePost2,
  deletePost: deletePost2,
  getStatistics: getStatistics2
};

// src/modules/Posts/posts.routes.ts
var router = Router();
router.get("/", postsControllers.getAllPosts);
router.get(
  "/my-Posts",
  auth_default("ADMIN" /* ADMIN */, "USER" /* USER */),
  postsControllers.getMyPost
);
router.get("/stats", auth_default("ADMIN" /* ADMIN */), postsControllers.getStatistics);
router.get("/:id", postsControllers.getPostById);
router.post(
  "/",
  auth_default("ADMIN" /* ADMIN */, "USER" /* USER */),
  postsControllers.createPost
);
router.patch(
  "/:id",
  auth_default("ADMIN" /* ADMIN */, "USER" /* USER */),
  postsControllers.updatePost
);
router.delete(
  "/:id",
  auth_default("ADMIN" /* ADMIN */, "USER" /* USER */),
  postsControllers.deletePost
);
var postsRoutes = router;

// src/app.ts
import { toNodeHandler } from "better-auth/node";
import cors from "cors";

// src/modules/Comments/comments.routes.ts
import { Router as Router2 } from "express";

// src/modules/Comments/comments.services.ts
var createComment = async (payLoad) => {
  const result = await prisma.comments.create({
    data: payLoad
  });
  return result;
};
var getAllComments = async () => {
  const isExist = await prisma.comments.findFirst();
  if (!isExist) {
    throw new Error("NO_COMMENT_EXIST_YET");
  }
  const result = await prisma.comments.findMany({
    orderBy: {
      created_At: "asc"
    }
  });
  return result;
};
var getCommentById = async (id) => {
  const result = await prisma.comments.findUnique({
    where: {
      id
    },
    include: {
      post: {
        select: {
          title: true,
          content: true,
          views: true
        }
      }
    }
  });
  if (!result) {
    throw new Error("COMMENT_NOT_FOUND");
  }
  return result;
};
var getCommentByAuthorId = async (author_Id) => {
  const isExist = await prisma.comments.findFirst({
    where: {
      author_Id
    }
  });
  if (!isExist) {
    throw new Error("NO_COMMENT_CREATED_BY_THE_AUTHOR / INVALID_AUTHOR_ID");
  }
  const result = await prisma.comments.findMany({
    where: {
      author_Id
    },
    orderBy: {
      created_At: "asc"
    },
    include: {
      post: {
        select: {
          title: true,
          content: true,
          views: true
        }
      }
    }
  });
  return result;
};
var deleteComment = async (id, author_Id, isAdmin) => {
  const isExist = await prisma.comments.findUnique({
    where: {
      id
    },
    select: {
      id: true,
      author_Id: true
    }
  });
  if (!isExist) {
    throw new Error("NO_SUCH_COMMENT_EXIST_TO_DELETE");
  }
  if (!isAdmin && author_Id !== isExist.author_Id) {
    throw new Error("YOU_ARE_NOT_ALLOWED_TO_PERFORM_THIS_ACTION");
  }
  const result = await prisma.comments.delete({
    where: {
      id
    }
  });
  return result;
};
var updateComment = async (id, payLoad, author_Id, isAdmin) => {
  const isExist = await prisma.comments.findUnique({
    where: {
      id
    },
    select: {
      id: true,
      author_Id: true,
      status: true
    }
  });
  if (!isExist) {
    throw new Error("NO_SUCH_COMMANT_EXIST_TO_UPDATE");
  }
  const updateData = { ...payLoad };
  if (!isAdmin) {
    if (author_Id !== isExist.author_Id) {
      throw new Error("YOU_ARE_NOT_ALLOWED_TO_PERFORM_THIS_ACTION");
    }
    if (updateData.status && updateData.status === isExist.status) {
      delete updateData.status;
      if (Object.keys(updateData).length === 0) {
        throw new Error(`STATUS : ${isExist.status} ALREADY EXIST.`);
      }
    }
  }
  if (isAdmin) {
    delete updateData.content;
    if (updateData.status && updateData?.status === isExist.status) {
      delete updateData.status;
      if (Object.keys(updateData).length === 0) {
        throw new Error(`STATUS : ${isExist.status} ALREADY EXIST.`);
      }
    }
    if (Object.keys(updateData).length === 0) {
      throw new Error(
        "NO_VALID_FIELD_PROVIDED_FOR_UPDATE.YOU_CAN_ONLY_UPDATE_POST_STATUS."
      );
    }
  }
  const result = await prisma.comments.update({
    where: {
      id
    },
    data: updateData
  });
  return result;
};
var commentServices = {
  createComment,
  getAllComments,
  getCommentById,
  getCommentByAuthorId,
  deleteComment,
  updateComment
};

// src/modules/Comments/comments.controllers.ts
var createComment2 = async (req, res, next) => {
  try {
    const author_Id = req.user?.id;
    req.body["author_Id"] = author_Id;
    const result = await commentServices.createComment(req.body);
    res.status(201).json({
      success: true,
      message: "Comment creation successful",
      data: result
    });
  } catch (err) {
    next(err);
  }
};
var getAllComments2 = async (req, res, next) => {
  try {
    const result = await commentServices.getAllComments();
    res.status(200).json({
      success: true,
      message: "Getting all comments successfully",
      data: result
    });
  } catch (err) {
    next(err);
  }
};
var getCommentById2 = async (req, res, next) => {
  try {
    const result = await commentServices.getCommentById(
      req.params.id
    );
    res.status(200).json({
      success: true,
      message: "Getting comment successfully",
      data: result
    });
  } catch (err) {
    next(err);
  }
};
var getCommentByAuthorId2 = async (req, res, next) => {
  try {
    const result = await commentServices.getCommentByAuthorId(
      req.params.id
    );
    res.status(200).json({
      success: true,
      message: "Getting comment successfully",
      data: result
    });
  } catch (err) {
    next(err);
  }
};
var deleteComment2 = async (req, res, next) => {
  try {
    const user = req.user;
    if (!user) {
      throw new Error("User not found");
    }
    const isAdmin = user.role === "ADMIN" /* ADMIN */;
    const result = await commentServices.deleteComment(
      req.params.id,
      user.id,
      isAdmin
    );
    res.status(200).json({
      success: true,
      message: "Comment Deleted Successfully",
      data: result
    });
  } catch (err) {
    next(err);
  }
};
var updateComment2 = async (req, res, next) => {
  try {
    const user = req.user;
    if (!user) {
      throw new Error("User not found");
    }
    const isAdmin = user.role === "ADMIN" /* ADMIN */;
    const result = await commentServices.updateComment(
      req.params.id,
      req.body,
      user?.id,
      isAdmin
    );
    res.status(200).json({
      success: true,
      message: "Comment updation successful",
      data: result
    });
  } catch (err) {
    next(err);
  }
};
var commentControllers = {
  createComment: createComment2,
  getAllComments: getAllComments2,
  getCommentById: getCommentById2,
  getCommentByAuthorId: getCommentByAuthorId2,
  deleteComment: deleteComment2,
  updateComment: updateComment2
};

// src/modules/Comments/comments.routes.ts
var router2 = Router2();
router2.get("/", commentControllers.getAllComments);
router2.get("/:id", commentControllers.getCommentById);
router2.get("/author/:id", commentControllers.getCommentByAuthorId);
router2.post(
  "/",
  auth_default("ADMIN" /* ADMIN */, "USER" /* USER */),
  commentControllers.createComment
);
router2.patch(
  "/:id",
  auth_default("ADMIN" /* ADMIN */, "USER" /* USER */),
  commentControllers.updateComment
);
router2.delete(
  "/:id",
  auth_default("ADMIN" /* ADMIN */, "USER" /* USER */),
  commentControllers.deleteComment
);
var commentRoutes = router2;

// src/middleware/globalErrorHandler.ts
function errorHandler(err, req, res, next) {
  let statusCode = 500;
  let errMessage = err.message || "INTERNAL_SERVER_ERROR";
  if (err instanceof prismaNamespace_exports.PrismaClientValidationError) {
    statusCode = 400;
    errMessage = "THE REQUEST WAS UNACCEPTABLE, OFTEN DUE TO MISSING A REQUIRED PARAMETER.";
  } else if (err instanceof prismaNamespace_exports.PrismaClientKnownRequestError) {
    if (err.code === "P2025") {
      statusCode = 404;
      errMessage = "AN OPERATION FAILED BECAUSE IT DEPENDS ON ONE OR MORE RECORDS THAT WERE REQUIRED BUT NOT FOUND";
    } else if (err.code === "P2002") {
      statusCode = 409;
      errMessage = "UNIQUE CONSTRAINT FAILED";
    } else if (err.code === "P2003") {
      statusCode = 400;
      errMessage = "FOREIGN KEY CONSTRAINT FAILED";
    }
  } else if (err instanceof prismaNamespace_exports.PrismaClientUnknownRequestError) {
    statusCode = 500;
    errMessage = "AN AUTHENTICATION FAILURE AGAINST YOUR DATABASE SERVER";
  } else if (err instanceof prismaNamespace_exports.PrismaClientRustPanicError) {
    statusCode = 500;
    errMessage = "INTERNAL_SERVER_ERROR";
  } else if (err instanceof prismaNamespace_exports.PrismaClientInitializationError) {
    if (err.errorCode === "P1000") {
      statusCode = 500;
      errMessage = "AN AUTHENTICATION FAILURE WITH YOUR DATABASE SERVER";
    } else if (err.errorCode === "P1001") {
      statusCode = 500;
      errMessage = "UNABLE TO REACH THE DATABASE SERVER AT THE SPECIFIED HOST AND PORT";
    }
  }
  res.status(statusCode);
  res.json({ success: false, message: errMessage });
}
var globalErrorHandler_default = errorHandler;

// src/middleware/notfound.ts
var notFound = (req, res) => {
  res.status(404).json({
    success: false,
    message: "ROUTE_NOT_FOUND",
    path: req.originalUrl,
    date: Date()
  });
};
var notfound_default = notFound;

// src/app.ts
var app = express();
var allowedOrigins = [
  config2.APP_URL || "http://localhost:3000",
  config2.PROD_APP_URL,
  // Production frontend URL
  "http://localhost:3000",
  "http://localhost:5000"
].filter(Boolean);
app.use(express.json());
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      const isAllowed = allowedOrigins.includes(origin) || /^https:\/\/Blog_Application_client.*\.vercel\.app$/.test(origin) || /^https:\/\/.*\.vercel\.app$/.test(origin);
      if (isAllowed) {
        callback(null, true);
      } else {
        callback(new Error(`Origin ${origin} not allowed by CORS`));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
    exposedHeaders: ["Set-Cookie"]
  })
);
app.all("/api/auth/*splat", toNodeHandler(auth));
app.use("/posts", postsRoutes);
app.use("/comments", commentRoutes);
app.get("/", (req, res) => {
  res.send("Welcome to Prisma Blog_Application");
});
app.use(notfound_default);
app.use(globalErrorHandler_default);
var app_default = app;

// src/index.ts
var index_default = app_default;
export {
  index_default as default
};
