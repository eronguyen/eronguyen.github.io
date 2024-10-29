import React from "react";

// const publicationsHeader = {
//     title: "Publications",
//     description: "Some of my published Articles, Blogs and Research.",
//     avatar_image_path: "projects_image.svg",
//   };

const publications = {
  data: [
    {
      title:
        "Vision-Aware Text Features in Referring Image Segmentation: From Object Understanding to Context Understanding",
      type: "WACV",
      logo_path: "vatex.png",
      alt_name: "VATEX",
      authors: (
        <>
          <a
            href="https://scholar.google.es/citations?user=D1ngwXoAAAAJ&hl=en"
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            Hai Nguyen-Truong*
          </a>
          ,
          <a
            href="/home"
            target="_blank"
            rel="noopener noreferrer"
            className="highlighted-author"
          >
            {" "}
            E-Ro Nguyen*
          </a>
          ,
          <a
            href="https://tuananh1007.github.io/"
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            Tuan-Anh Vu
          </a>
          ,
          <a
            href="https://scholar.google.com/citations?user=lt2ATkkAAAAJ&hl=en"
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            Minh-Triet Tran
          </a>
          ,
          <a
            href="https://sonhua.github.io/"
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            Binh-Son Hua
          </a>
          ,
          <a
            href="https://saikit.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            Sai-Kit Yeung
          </a>
        </>
      ),
      descriptions: [
        "⚡ IEEE/CVF Winter Conference on Applications of Computer Vision (WACV), 2025 ",
      ],
      website_link: "https://nero1342.github.io/VATEX_RIS/",
      code_link: "https://github.com/nero1342/VATEX_RIS",
      paper_link: "https://arxiv.org/abs/2404.08590/",
    },
    {
      title:
        "V-FIRST 2.0: Video Event Retrieval with Flexible Textual-Visual Intermediary for VBS 2023",
      type: "MMM",
      logo_path: "publications/V-First2.png",
      alt_name: "VFirst2.0",
      authors: (
        <>
          <a
            href="https://scholar.google.com/citations?hl=vi&user=r_IK5BMAAAAJ"
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            Nhat Hoang-Xuan*
          </a>
          ,
          <a
            href="/home"
            target="_blank"
            rel="noopener noreferrer"
            className="highlighted-author"
          >
            {" "}
            E-Ro Nguyen
          </a>
          , Thang-Long Nguyen-Ho, Minh-Khoi Pham, Quang-Thuc Nguyen, Hoang-Phuc
          Trang-Trung, Van-Tu Ninh, Tu-Khiem Le, Cathal Gurrin,
          <a
            href="https://scholar.google.com/citations?user=lt2ATkkAAAAJ&hl=en"
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            Minh-Triet Tran
          </a>
        </>
      ),
      descriptions: [
        "⚡ In MultiMedia Modeling: 29th International Conference, 2023 ",
      ],
      paper_link: "https://dl.acm.org/doi/abs/10.1145/3512729.3533013",
    },
    {
      title:
        "Flexible Interactive Retrieval SysTem 3.0 for Visual Lifelog Exploration",
      type: "ICMR",
      logo_path: "publications/First3.png",
      alt_name: "FIRST3.0",
      authors: (
        <>
          <a
            href="https://scholar.google.es/citations?user=D1ngwXoAAAAJ&hl=en"
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            Nhat Hoang-Xuan
          </a>
          ,
          <a
            href="https://www.linkedin.com/in/hoang-phuc-trang-trung"
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            Hoang-Phuc Trang-Trung
          </a>
          ,
          <a
            href="/home"
            target="_blank"
            rel="noopener noreferrer"
            className="highlighted-author"
          >
            {" "}
            E-Ro Nguyen*
          </a>
          , Thanh-Cong Le, Mai-Khiem Tran, Tu-Khiem Le, Van-Tu Ninh, Cathal
          Gurrin,
          <a
            href="https://scholar.google.com/citations?user=lt2ATkkAAAAJ&hl=en"
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            Minh-Triet Tran
          </a>
          ,
        </>
      ),
      descriptions: [
        "⚡ In Proceedings of the 5th Annual on Lifelog Search Challenge, International Conference on Multimedia Retrieval, 2022",
      ],
      paper_link: "https://dl.acm.org/doi/abs/10.1145/3512729.3533013",
    },
    {
      title:
        "Visual-Language Transformer for Referring Video Object Segmentation",
      type: "CVPRW",
      logo_path: "publications/VLFormer.png",
      alt_name: "VLFormer",
      authors: (
        <p>
          <a
            href="/home"
            target="_blank"
            rel="noopener noreferrer"
            className="highlighted-author"
          >
            {" "}
            E-Ro Nguyen
          </a>
          ,
          <a
            href="https://scholar.google.com/citations?hl=vi&user=r_IK5BMAAAAJ"
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            Nhat Hoang-Xuan
          </a>
          ,
          <a
            href="https://scholar.google.com/citations?user=lt2ATkkAAAAJ&hl=en"
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            Minh-Triet Tran
          </a>
        </p>
      ),
      descriptions: ["⚡ YouTube-VOS Challenge, CVPR Workshops, 2022"],
      website_link: "https://nero1342.github.io/VLFormer_RIS/",
      code_link: "https://github.com/nero1342/VLFormer_RIS",
      paper_link:
        "https://youtube-vos.org/assets/challenge/2022/reports/RVOS_5_Nguyen.pdf/",
    },
    {
      title:
        "PointRend with Attention Fusion Refinement for Polyps Segmentation",
      type: "MediaEval",
      logo_path: "publications/Medico.png",
      alt_name: "Medico",
      authors: (
        <p>
          <a
            href="/home"
            target="_blank"
            rel="noopener noreferrer"
            className="highlighted-author"
          >
            {" "}
            E-Ro Nguyen
          </a>
          ,
          <a
            href="https://scholar.google.com/citations?user=L5O1bnUAAAAJ&hl=vi"
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            Hai-Dang Nguyen
          </a>
          ,
          <a
            href="https://scholar.google.com/citations?user=lt2ATkkAAAAJ&hl=en"
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            Minh-Triet Tran
          </a>
        </p>
      ),
      descriptions: ["⚡ Medico task, MediaEval Benchmark, 2021"],
      paper_link: "https://ceur-ws.org/Vol-3181/paper31.pdf",
    },
    {
      title:
        "Attention-based Hierarchical Fusion Network for Predicting Media Memorability",
      type: "MediaEval",
      logo_path: "publications/Memorable.png",
      alt_name: "Medico",
      authors: (
        <p>
          <a
            href="/home"
            target="_blank"
            rel="noopener noreferrer"
            className="highlighted-author"
          >
            {" "}
            E-Ro Nguyen
          </a>
          , Hai-Dang Huynh-Lam,
          <a
            href="https://scholar.google.com/citations?user=L5O1bnUAAAAJ&hl=vi"
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            Hai-Dang Nguyen
          </a>
          ,
          <a
            href="https://scholar.google.com/citations?user=lt2ATkkAAAAJ&hl=en"
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            Minh-Triet Tran
          </a>
        </p>
      ),
      descriptions: [
        "⚡ Predicting Media Memorability task, MediaEval Benchmark, 2021",
      ],
      paper_link: "https://ceur-ws.org/Vol-3181/paper71.pdf",
    },
  ],
};

export default publications;
