import Image from "next/image";
import styles from "./page.module.css";
import SalaryMan from "@/components/SalaryMan";

export default function Home() {
  return (
    <main className={styles.main}>
      <SalaryMan />
    </main>
  );
}
