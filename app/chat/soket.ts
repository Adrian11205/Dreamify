import { io, type Socket } from "socket.io-client";

let socket: Socket | null = null;

export default function getSocket(): Socket | null {
  if (typeof window === "undefined") return null;

  socket ??= io();
  return socket;
}
