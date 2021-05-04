import styles from "./about.module.css";
import { Container, Row, Col } from "react-bootstrap";
import author from "../../../assets/images/cv.png";

const ContainerCls = ["d-flex flex-column my-4 p-5", styles.container];

const About = () => {
  return (
    <Container className={ContainerCls}>
      <Row className=" justify-content-center">
        <Col className="d-flex flex-column align-items-center">
          <h1>Amalya Ghazaryan</h1>
          <h2>Frontend Web Developer | ReactJS</h2>
        </Col>
      </Row>
      <Row className="d-flex justify-content-center align-self-center">
        <Col>
          <img className={styles.img} src={author} alt="author" />
        </Col>
      </Row>
      <Row>
        <Col className="d-flex flex-column justify-content-between">
          <h2>Personal</h2>
          <p>Phone: +374 95 67 21 89 </p>
          <p>Email: amalyaghazaryan95@gmail.com </p>
          <p>
            LinkedIn:
            <a
              href="https://www.linkedin.com/in/amalya-ghazaryan-62315b201"
              target="_blank"
              rel="noreferrer"
            >
              Amalya Ghazaryan
            </a>
          </p>
          <p>
            GitHub:
            <a
              href="https://github.com/AmalyaG95"
              target="_blank"
              rel="noreferrer"
            >
              Amalya Ghazaryan
            </a>
          </p>
        </Col>
      </Row>
      <Row>
        <Col>
          <h2>Summary</h2>
          <p>
            I have been teaching schoolchildren English for a long time.
            Recently I have completed "React.JS" course at Bitschool, within
            which I have studied React.js, Redux.js, Git/Github, Domain/Hosting
            and I have worked on this
            <a
              href="https://github.com/AmalyaG95/react-beg-06"
              target="_blank"
              rel="noreferrer"
            >
              "ToDo App"
            </a>
            project. I'm seeking a job, which will give me an opportunity for
            learning, continuous growth, practical experience and satisfaction
            with my job.
          </p>
        </Col>
      </Row>
      <Row>
        <Col>
          <h2>Professional Skills</h2>
          <ul>
            <li>JavaScript</li>
            <li>C++</li>
            <li>HTML5/CSS3</li>
            <li>React.js</li>
            <li>Redux.js</li>
            <li>Git/Github</li>
            <li>Domain/Hosting</li>
          </ul>
        </Col>
      </Row>
      <Row>
        <Col>
          <h2>Personal Skills</h2>
          <ul>
            <li>Positive attitude</li>
            <li>Conﬂict resolution skills</li>
            <li>Easily Adaptable</li>
            <li>Goal-oriented</li>
            <li>Analytical skills</li>
            <li>Creative thinking</li>
            <li>Critical thinking</li>
            <li>Attention tDetail</li>
            <li>Hardworking</li>
            <li>Continuous learning drive</li>
            <li>Punctuality</li>
          </ul>
        </Col>
      </Row>
      <Row>
        <Col>
          <h2>Languages</h2>
          <ul>
            <li>Armenian (Native or bilingual proficiency)</li>
            <li>English (Full professional proficiency)</li>
            <li>Russian (Full professional proficiency)</li>
          </ul>
        </Col>
      </Row>

      <Row>
        <Col>
          <h2>Experience</h2>
          <div>
            <h3>
              2019 December - 2020 August, Bookkeeper at Likenet LLC, Yerevan
            </h3>
            <ul>
              <li>inventory management </li>
              <li>
                administration of accounts payable and accounts receivable
              </li>
              <li>organization of document circulation</li>
            </ul>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <h2>Education and training</h2>
          <div>
            <div>
              <h3>"Advanced C++" course </h3>
              <p>Russian - Armenian University, online</p>
              <p>2021 March – 2021 April</p>
            </div>
            <div>
              <h3>"React.JS" programming course (beginner level)</h3>

              <p>Bitschool / IT and Business School, online</p>
              <p>2021 February - 2021 April</p>
            </div>
            <div>
              <h3>"Basics of Programming" course </h3>

              <p>Russian - Armenian University, online</p>
              <p>2020 December - 2021 February</p>
            </div>
            <div>
              <h3>"Web (HTML/CSS)" programming course (intermediate level)</h3>

              <p>Microsoft Innovation Center Armenia, online </p>
              <p>2020 December - 2021 February</p>
            </div>
            <div>
              <h3>"Web (HTML/CSS)" programming course (beginner level)</h3>

              <p>Microsoft Innovation Center Armenia, online </p>
              <p>2020 September - 2020 November</p>
            </div>
            <div>
              <h3>Introduction to Financial Accounting </h3>

              <p>Wharton University of Pennsylvania, online </p>
              <p>2019 November - 2019 December</p>
            </div>
            <div>
              <h3>Financial analyst preparation </h3>

              <p>Quick Start, 6 Yekmalyan Str., Yerevan 0002 </p>
              <p>2019 June - 2019 July</p>
            </div>
            <div>
              <h3>
                Master's degree of Economics in the ﬁeld of "Finance, "Corporate
                ﬁnance", diploma with honour
              </h3>

              <p>ASUE, 128 Nalbandyan Str., Yerevan 0025 </p>
              <p>2017 September - 2019 May</p>
            </div>
            <div>
              <h3>Bachelor's degree of Finance in the ﬁeld of "Finance"</h3>

              <p>ASUE, 128 Nalbandyan Str., Yerevan 0025</p>
              <p>2013 September - 2017 May</p>
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <h2>Interests and Hobbies</h2>
          <p>I like playing the piano, dancing and listening to good music</p>
        </Col>
      </Row>
    </Container>
  );
};

export default About;
