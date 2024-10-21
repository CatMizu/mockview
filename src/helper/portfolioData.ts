// src/helper/portfolioData.ts
export interface PortfolioData {
    id: number;
    title: string;
    img: string;
    videoLink: string;
    analyze: string;
  }
  
  // 定义并导出 portfolioData
  const portfolioData: PortfolioData[] = [
    {
      id: 1,
      tag: "UI/UX",
      title: "Chul urina",
      img: "https://reqres.in/img/faces/7-image.jpg",
      imgSmall: "https://reqres.in/img/faces/7-image.jpg",
      bg: "#FFF0F0",
      client: "Envato",
      langages: "Photoshop, Figma",
      link: "https://www.envato.com",
      linkText: "www.envato.com",
      description:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Mollitia placeat magnam possimus iusto blanditiis pariatur labore explicabo quo repellat hic dolorum numquam asperiores, voluptatum fugiat reiciendis aspernatur, non, odio aperiam voluptas ex tempora vitae.",
    },
    {
      id: 2,
      tag: "Web Design",
      title: "Aura Dione",
      img: "https://reqres.in/img/faces/7-image.jpg",
      imgSmall: "https://reqres.in/img/faces/7-image.jpg",
      bg: "#FFF3FC",
      client: "Themeforest",
      langages: "HTML, CSS, Javascript",
      link: "https://www.themeforest.net",
      linkText: "themeforest.net",
      description:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate non suscipit voluptatibus minima ullam maiores sequi nihil placeat error, vero eaque doloremque reiciendis amet pariatur consequuntur.",
    },
    {
      id: 3,
      tag: "Logo",
      title: "Chul urina",
      img: "https://reqres.in/img/faces/7-image.jpg",
      imgSmall: "https://reqres.in/img/faces/7-image.jpg",
      bg: "#FFF0F0",
      client: "Freepik",
      langages: "Illustrator",
      link: "https://www.freepik.com/free-photos-vectors/market-logo",
      linkText: "www.freepik.com",
      description:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate non suscipit voluptatibus minima ullam maiores sequi nihil placeat error.",
    },
    {
      id: 4,
      tag: "Video",
      title: "Chul urina",
      img: "https://reqres.in/img/faces/7-image.jpg",
      imgSmall: "https://reqres.in/img/faces/7-image.jpg",
      bg: "#E9FAFF",
      client: "Envato",
      langages: "After Effect",
      link: "https://www.envato.com",
      linkText: "www.envato.com",
      description:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate non suscipit voluptatibus minima ullam maiores sequi nihil placeat error.",
    },
    {
      id: 5,
      tag: "UI/UX",
      title: "Chul urina",
      img: "https://reqres.in/img/faces/7-image.jpg",
      imgSmall: "https://reqres.in/img/faces/7-image.jpg",
      bg: "#FFFAE9",
      client: "Envato",
      langages: "Photoshop",
      link: "https://www.envato.com",
      linkText: "www.envato.com",
      description:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate non suscipit voluptatibus minima ullam maiores sequi nihil placeat error.",
    },
    {
      id: 6,
      tag: "Video",
      title: "Chul urina",
      img: "https://reqres.in/img/faces/7-image.jpg",
      imgSmall: "https://reqres.in/img/faces/7-image.jpg",
      bg: "#F4F4FF",
      client: "Envato",
      langages: "Vimeo",
      link: "https://www.envato.com",
      linkText: "www.envato.com",
      description:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate non suscipit voluptatibus minima ullam maiores sequi nihil placeat error.",
    },
  ];
  
  export default portfolioData;
  