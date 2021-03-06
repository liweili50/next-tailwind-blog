import { useState, useEffect } from "react";
import Link from "next/link";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useTitle } from "react-use";
import { getPostsByTag } from "../../api/post";

const ArticleList = function ({ list }) {
  const listItems = list.map((article) => (
    <li key={article._id} className="my-4 cursor-pointer">
      <span className="icon text-sm">
        <i className="czs-square-o" aria-hidden="true" />
      </span>
      <Link href={"/post/" + article._id}>
        <span>
          <span className="px-4">
            {dayjs(article.createTime).format("YYYY-MM-DD HH:mm:ss")}
          </span>
          {article.title}
        </span>
      </Link>
    </li>
  ));
  return <>{listItems}</>;
};

const Tag = function () {
  const [list, setList] = useState([]);
  const router = useRouter();
  useTitle(router.query.pid);
  const { pid } = router.query;
  useEffect(() => {
    const handleGetArticleList = function () {
      getPostsByTag({ tag: pid }).then((res) => {
        setList(res.data);
      });
    };
    handleGetArticleList();
  }, []);
  return (
    <div className="p-5 lg:p-10 bg-base-100">
      <h5 className="text-2xl">{router.query.pid}</h5>
      <ul className="article-list">
        {list.length > 0 && <ArticleList list={list} />}
      </ul>
    </div>
  );
};
export default Tag;
