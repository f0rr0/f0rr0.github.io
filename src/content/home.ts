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
