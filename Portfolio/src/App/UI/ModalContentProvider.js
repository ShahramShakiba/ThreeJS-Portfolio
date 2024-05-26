export default class ModalContentProvider {
  constructor() {
    this.modalContents = {
      aboutMe: {
        title: 'About me',
        description:`
          <div class="aboutMe-Container">
            <div>
              <img src="../../Assets/Sh.jpg" alt="Shahram-image" />
            </div>
            <p>
               I am dedicated to enhancing user experiences through streamlined interfaces, ultimately fostering a more engaging online environment.
            </p>

            <p>
               Additionally, I am committed to continuously expanding my knowledge and staying current with industry trends and emerging technologies through proactive learning initiatives.
            </p>

            <p>
               I prioritize effective communication and possess a solid technical background.
               My commitment lies in developing strong relationships with my team members and clients.
            </p>
          </div>
          `,
      },
      projects: {
        title: 'Projects',
        description: `<div class="projects-container">
                <p class="title">Three.js:</p>
                <p class="desc">&nbsp; 
                  <a href="https://github.com/ShahramShakiba/ThreeJS-Portfolio">
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
                  <a href="https://github.com/ShahramShakiba/Framer-Motion-Basic" target="_blank">
                    React Challenges
                  </a>
                </p>
              </div>

              <div class="projects-container">
                <p class="title">React.js:</p>
                <p class="desc">&nbsp; 
                  <a href="https://github.com/ShahramShakiba/ReactJS-Advanced-Course" target="_blank">
                    React Events
                  </a>
                </p>
              </div>

              <div class="projects-container">
                <p class="title">React.js:</p>
                <p class="desc">&nbsp; 
                  <a href="https://github.com/ShahramShakiba/ReactJS-Advanced-Course" target="_blank">
                    Newsletter
                  </a>
                </p>
              </div>

              <div class="projects-container">
                <p class="title">React.js:</p>
                <p class="desc">&nbsp; 
                  <a href="https://github.com/ShahramShakiba/ReactJS-Advanced-Course" target="_blank">
                    Ordering Food
                  </a>
                </p>
              </div>

              <div class="projects-container">
                <p class="title">React.js:</p>
                <p class="desc">&nbsp; 
                  <a href="https://github.com/ShahramShakiba/ReactJS-Advanced-Course" target="_blank">
                     Place Picker
                  </a>
                </p>
              </div>

              <div class="projects-container">
                <p class="title">Tailwindcss:</p>
                <p class="desc">&nbsp; 
                  <a href="https://github.com/ShahramShakiba/Bank-Landing-Page">
                      Bank Landing Page 
                  </a>
                </p>
              </div>

              <div class="projects-container">
                <p class="title">Tailwindcss:</p>
                <p class="desc">&nbsp;
                  <a href="https://github.com/ShahramShakiba/HomeSmart-Landing-Page">
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
