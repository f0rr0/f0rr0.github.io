export const homeIntroduction =
  "I’m a full-stack engineer in Mumbai. I build web and mobile products, and more recently, AI applications. My work often starts where the documentation ends.";

export const projectEditorial = {
  "thrift-compact-protocol": {
    bucket: "Open source" as const,
    description:
      "TypeScript encoder and decoder for Thrift’s compact protocol.",
  },
  oliphaunt: {
    bucket: "Open source" as const,
    description: "Embedded PostgreSQL tooling for applications and tests.",
  },
  "pg-browser-proxy": {
    bucket: "Open source" as const,
    description:
      "Connect desktop database clients to PostgreSQL running in a browser.",
  },
  "react-native-rating": {
    bucket: "Open source" as const,
    description:
      "React Native rating component built with Animated and the native driver.",
  },
} as const;

export const featuredProjectNames = [
  "oliphaunt",
  "thrift-compact-protocol",
  "react-native-rating",
  "pg-browser-proxy",
] as const;
