export default class ModalContentProvider {
  constructor() {
    this.modalContents = {
      aboutMe: {
        title: 'About me',
        description:
          'I take pride in the fact that these interfaces enhance user experiences and simplify complex interactions, ultimately creating a more engaging Online Environment for all users. <br/> I am proactive in my pursuit of knowledge, constantly seeking ways to broaden my expertise and stay up-to-date with the latest industry trends and emerging technologies',
      },
      projects: {
        title: 'Projects',
        description: `<div class="projects-container">
                <p class="title">Three.js:</p>
                <p class="desc">&nbsp; 
                  <a href="">
                      Portfolio
                  </a>
                </p>
              </div>

              <div class="projects-container">
                <p class="title">Next.js:</p>
                <p class="desc">&nbsp; 
                   <a href="https://github.com/ShahramShakiba/NextJS-FoodLovers" target="_blank">
                      FoodLovers
                   </a>
                </p>
              </div>

              <div class="projects-container">
                <p class="title">Framer Motion:</p>
                <p class="desc">&nbsp; 
                  <a href="https://framer-motion-challenges-shahram.netlify.app/" target="_blank">
                    React Challenges
                  </a>
                </p>
              </div>

              <div class="projects-container">
                <p class="title">React.js:</p>
                <p class="desc">&nbsp; 
                  <a href="https://react-events-shahram.netlify.app/events" target="_blank">
                    React Events
                  </a>
                </p>
              </div>

              <div class="projects-container">
                <p class="title">React.js:</p>
                <p class="desc">&nbsp; 
                  <a href="https://newsletter-react-router-auth-shahram.netlify.app/" target="_blank">
                    Newsletter
                  </a>
                </p>
              </div>

              <div class="projects-container">
                <p class="title">React.js:</p>
                <p class="desc">&nbsp; 
                  <a href="https://ordering-food-http-shahram.netlify.app/" target="_blank">
                    Ordering Food
                  </a>
                </p>
              </div>

              <div class="projects-container">
                <p class="title">React.js:</p>
                <p class="desc">&nbsp; 
                  <a href="https://placepicker-customhook-shahram.netlify.app/"_blank">
                     Place Picker
                  </a>
                </p>
              </div>

              <div class="projects-container">
                <p class="title">Tailwindcss:</p>
                <p class="desc">&nbsp; 
                  <a href="https://shahramshakiba.github.io/Bank-Landing-Page/">
                      Bank Landing Page 
                  </a>
                </p>
              </div>

              <div class="projects-container">
                <p class="title">Tailwindcss:</p>
                <p class="desc">&nbsp;
                  <a href="https://shahramshakiba.github.io/HomeSmart-Landing-Page/">
                    HomeSmart Landing Page 
                  </a>
                </p>
           </div>
          `,
      },
      contactMe: {
        title: 'Contact Me',
        description: `
        <div class="contactMe-container">
          <p> LinkedIn: </p>
          <a href="https://www.linkedin.com/in/shahramshakiba/" target="_blank" >
              www.linkedin.com/in/shahramshakiba/
          </a> <br/>
          
          <p> GitHub: </p>
          <a href="https://github.com/ShahramShakiba" target="_blank">
              github.com/ShahramShakiba
          </a> <br/>

          <p> Gmail: </p>
          <a href="mailto:shahramshakibaa@gmail.com" target="_blank">
            shahramshakibaa@gmail.com
          </a>
        </div>
       `,
      },
    };
  }

  formatDescription(description) {
    // Add a <br/> after each period followed by a space
    description = description.replace(/\. /g, '.<br/><br/> ');
    // Replace <br/> with <br/><br/> to ensure two line breaks
    description = description.replace(/<br\/?>/g, '<br/><br/>');
    return description;
  }

  getModalInfo(portalName) {
    const modalInfo = this.modalContents[portalName];
    if (modalInfo && modalInfo.description) {
      modalInfo.description = this.formatDescription(modalInfo.description);
    }
    return modalInfo;
  }
}
