"use client";

import { Feed } from "./components/Feed";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { collection, getDocs } from "@firebase/firestore";
import { firestore } from "../firebase";
import { useAuth } from "./store/useAuth";

// 새로운 이미지를 올리는 화면
// feeds 다른사람들의 피드를 보는 화면
// my 내 정보화면




export default function Home() {

  //처음 피드를 firebase storage에 업로드해야 할 때 에러 없이 업로드 페이지로 랜딩할 수 있게 해주는 dummy_data
  // const DUMMY_DATA = [
  //   {
  //     id: "xxxx",
  //     author: {
  //       id: "awnklfneawe",
  //       name: "frogman",
  //       profileImg:
  //         "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
  //     },
  //     location: "seoul",
  //     image: "https://cdn.britannica.com/38/196638-131-7BF02881/Santa-Claus.jpg",
  //     text: "Christmas will coming soon!!!",
  //     liked: [],
  //   },]
  // const [contents, setContents] = useState(DUMMY_DATA);
  
  const router = useRouter();
  const [contents, setContents] = useState([]);
  const { user } = useAuth();
 
  useEffect(() => {
    fetchFeeds();
  }, []);

  const fetchFeeds = async () => {
    const snapShot = await getDocs(collection(firestore, "feeds"));
    const nextContents = [];
    snapShot.forEach((doc) => nextContents.push(doc.data()));
    setContents(nextContents);
  };

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        {contents.map((content, index) => (
           <Feed key={index} content={content} />
        ))}
      </main>
      <button
       className="fixed bottom-10 left-0 right-0 mx-auto
       w-16 h-16
       bg-[url(https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Instagram-Icon.png/768px-Instagram-Icon.png)]
       bg-cover shadow-xl"
        onClick={() => {
          if (user) return router.push("/new");
          router.push("/auth");
        }}
      ></button>
    </>
  );
}
