import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "./page.module.css";
import axios from "axios";

const inter = Inter({ subsets: ["latin"] });

export default async function Home() {
  const { data } = await axios.get("http://localhost:3000/api/users");
  console.log(data);

  return <main className={styles.main}>{data?.name}</main>;
}
