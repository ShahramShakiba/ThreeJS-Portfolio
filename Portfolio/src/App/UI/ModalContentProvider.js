export default class ModalContentProvider {
    constructor() {
      this.modalContents = {
        aboutMe: {
          title: 'About me',
          description: 'I take pride in the fact that these interfaces enhance user experiences and simplify complex interactions, ultimately creating a more engaging Online Environment for all users. <br/>  I am proactive in my pursuit of knowledge, constantly seeking ways to broaden my expertise and stay up-to-date with the latest industry trends and emerging technologies',
        },
        projects: {
          title: 'Projects',
          description: 'Three.js Portfolio - Next.js FoodLovers - Framer Motion Challenges - React Events - React Newsletter - React Ordering Food - React Place Picker - Tailwindcss Bank Landing Page - Tailwindcss HomeSmart Landing Page',
        },
        contactMe: {
          title: 'Contact Me',
          description: 'LinkedIn: www.linkedin.com/in/shahramshakiba/',
        },
      }
    }
  
    getModalInfo(portalName) {
      return this.modalContents[portalName];
    }
  }
  