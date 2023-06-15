import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

/**
  Calculates the time difference between the server time and client time.
  @param {Date} serverTime - The server time.
  @param {Date} clientTime - The client time.
  @returns {string} The time difference in the format "{days} days, {hours} hours, {minutes} minutes, {seconds} seconds".
*/

const calculateTimeDifference = (server: Date, client: Date) => {
  // convert the IsoString to Date
  const serverTime = new Date(server);
  // Calculate the difference in milliseconds
  const diffInMilliseconds = Math.abs(serverTime.getTime() - client.getTime());

  // Convert the difference in milliseconds to days, hours, minutes, and seconds
  const days = Math.floor(diffInMilliseconds / 86400000);
  const hours = Math.floor((diffInMilliseconds % 86400000) / 3600000);
  const minutes = Math.floor((diffInMilliseconds % 3600000) / 60000);
  const seconds = Math.floor((diffInMilliseconds % 60000) / 1000);
  return `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
};

const displayFullDate = (date: string) => {
  // Format: DD-MM-AAAA HH:mm
  // Split the string to get the date
  const data = date.split("T")[0];
  const days = data.split("-")[2];
  const month = data.split("-")[1];
  const year = data.split("-")[0];

  //Split the string to get the time
  const time = date.split("T")[1];
  const hours = time.split(":")[0];
  const minutes = time.split(":")[1];

  return `${days}-${month}-${year} ${hours}:${minutes}`;
};

type ServerTime = {
  server: Date;
};

export const getServerSideProps = async () => {
  const server = new Date().toISOString();
  return {
    props: {
      server,
    },
  };
};

export default function Home({ server }: ServerTime) {
  const [client, setClient] = useState<Date | null>(null);
  const [timeDifference, setTimeDifference] = useState<string>("");
  const router = useRouter();
  const moveToTaskManager = () => {
    router.push("/tasks");
  };
  useEffect(() => {
    setClient(new Date());
  }, []);

  useEffect(() => {
    if (client) {
      setTimeDifference(calculateTimeDifference(server, client));
    }
  }, [client, server]);

  return (
    <>
      <Head>
        <title>Web 2 - Exam TD</title>
        <meta name="description" content="Just an exam" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>The easiest exam you will ever find</h1>
        <div>
          {/* Display here the server time (DD-MM-AAAA HH:mm)*/}
          <p>
            Server time:{" "}
            <span className="serverTime">
              {displayFullDate(server.toString())}
            </span>
          </p>

          {/* Display here the time difference between the server side and the client side */}
          <p>
            Time diff: <span className="serverTime">{timeDifference}</span>
          </p>
        </div>

        <div>
          <button onClick={moveToTaskManager}>Go to task manager</button>
        </div>
      </main>
    </>
  );
}
