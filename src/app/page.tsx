import Image from "next/image";
import styles from "./page.module.css";
import Profile from "../components/Profile";
import Button from "@/components/Button";
import Navigation from "@/components/Navigation";

export default function Home() {
  return (
    <>
      <Navigation>
        <h2>Projects</h2>
      </Navigation>
      <main>
        <Button expand>Start a new Project</Button>
      </main>
    </>
  );
}
