import { Badge } from "flowbite-react";
import parse from 'html-react-parser';
import { useEffect, useState } from "react";

import { Api } from "../api";
import Option from "../option";
import { TypeWorksList } from "../types";

type Props = {
  current: string;
}

export const WorksList: React.FC<Props> = ({ current }) => {
  const works = Api().works;
  const tagOption = Option
  const defaultColor = 'default'
  const [worksList, setWorksList] = useState([]);

  const getTagColor = (tag: string) => tagOption.find((item) => item.label === tag)?.color || defaultColor
  const formatDate = (date: string) => date.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3')

  // 初回
  useEffect(() => {
    setWorksList(works)
  }, [works])

  // 更新
  useEffect(() => {
    if (current === 'All') {
      setWorksList(works)
    } else {
      const updated = works.filter((work: TypeWorksList) => work.taxonomy.includes(current))
      setWorksList(updated)
    }
  }, [current])

  return (
    <ul className="grid md:grid-cols-2 lg:grid-cols-4 mt-10 gap-5">
      {worksList[0] && worksList.map((work: TypeWorksList, index) => (
        <li key={index}>
          <a href={work.acf.url} target="_blank">
            {/* thumbnail */}
            <div className="c-thumb">
              {work.thumbnail_url && <img src={work.thumbnail_url} alt="" />}
            </div>
            {/* taxonomy */}
            <ul className="tag flex flex-wrap gap-2 mt-4">
              {work.taxonomy.map((tax, index) => (
                <li key={index}><Badge color={getTagColor(tax)}>{tax}</Badge></li>
              ))}
            </ul>
            {/* title */}
            <p className="ttl text-2xl font-bold mt-3">{work.title.rendered}</p>
            {/* content */}
            {work.content.rendered && <div className="memo text-md mt-2">{parse(work.content.rendered)}</div>}
            {/* created date */}
            <p className="text-sm mt-2 text-gray-400">created：{formatDate(work.acf.created)}</p>
            {/* updated date */}
            {work.acf.updated && <p className="text-sm text-gray-400">updated：{formatDate(work.acf.updated)}</p>}
          </a>
          {/* github */}
          {work.acf.git && <a href={work.acf.git} target="_blank" className="text-2xl inline-block mt-4 transition ease-in-out duration-300 hover:text-blue-500"><i className="devicon-github-original"></i></a>}
        </li>
      ))}
    </ul>
  )
}