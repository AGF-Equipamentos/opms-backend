import { Connection, createConnections } from 'typeorm';

const connection = async (): Promise<Connection[]> => {
  return createConnections();
};

export default connection;
