import { jsx, jsxs } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@remix-run/node";
import { RemixServer, ScrollRestoration, Scripts, LiveReload, Meta, Links } from "@remix-run/react";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import React, { useState, useEffect } from "react";
import { Navbar, NavbarContent, NavbarMenuToggle, NavbarItem, Link, NavbarMenu, NavbarMenuItem, Form, Input, Textarea, ButtonGroup, Button, Card, CardBody, Image, CardFooter, NextUIProvider } from "@nextui-org/react";
import emailjs from "@emailjs/browser";
import DOMPurify from "dompurify";
import { useLocation } from "react-router-dom";
const ABORT_DELAY = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, remixContext, loadContext) {
  return isbot(request.headers.get("user-agent") || "") ? handleBotRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  ) : handleBrowserRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  );
}
function handleBotRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onAllReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
function handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onShellReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest
}, Symbol.toStringTag, { value: "Module" }));
function nav() {
  const [isNavOpen, setNavOpen] = React.useState(false);
  const NavItems = [
    { label: "Home", href: "/home" },
    { label: "About", href: "/about" },
    { label: "Experience", href: "/experience" },
    { label: "Contact", href: "/contact" }
  ];
  const handleLinkClick = () => {
    setNavOpen(false);
  };
  return /* @__PURE__ */ jsxs(Navbar, { className: "dark  bg-nav text-white shadow-md", onMenuOpenChange: setNavOpen, children: [
    /* @__PURE__ */ jsx(NavbarContent, { children: /* @__PURE__ */ jsx(
      NavbarMenuToggle,
      {
        "aria-label": isNavOpen ? "Close menu" : "Open menu",
        className: "sm:hidden",
        onClick: () => setNavOpen(!isNavOpen)
      }
    ) }),
    /* @__PURE__ */ jsxs(NavbarContent, { className: "hidden sm:flex gap-4", justify: "center", children: [
      /* @__PURE__ */ jsx(NavbarItem, { children: /* @__PURE__ */ jsxs(Link, { className: " text-lg hover:bg-accent text-white transition duration-75", href: "/home", children: [
        " ",
        /* @__PURE__ */ jsx("strong", { children: "Home " }),
        " "
      ] }) }),
      /* @__PURE__ */ jsx(NavbarItem, { children: /* @__PURE__ */ jsxs(Link, { className: "text-lg hover:bg-accent text-white transition duration-75 ", href: "/about", children: [
        " ",
        /* @__PURE__ */ jsx("strong", { children: " About " }),
        " "
      ] }) }),
      /* @__PURE__ */ jsx(NavbarItem, { children: /* @__PURE__ */ jsxs(Link, { className: "text-lg hover:bg-accent text-white transition duration-75", href: "/experience", children: [
        " ",
        /* @__PURE__ */ jsx("strong", { children: "  Experience " }),
        " "
      ] }) }),
      /* @__PURE__ */ jsx(NavbarItem, { children: /* @__PURE__ */ jsxs(Link, { className: " text-lg hover:bg-accent text-white transition duration-75", href: "/contact", children: [
        " ",
        /* @__PURE__ */ jsx("strong", { children: " Contact " }),
        " "
      ] }) })
    ] }),
    /* @__PURE__ */ jsx(NavbarContent, { justify: "end" }),
    /* @__PURE__ */ jsx(NavbarMenu, { className: "bg-nav", children: NavItems.map((item, index2) => /* @__PURE__ */ jsx(NavbarMenuItem, { children: /* @__PURE__ */ jsx(
      Link,
      {
        className: `text-lg text-white block py-2 hover:bg-accent`,
        href: item.href,
        "hover:bg-accent": true,
        onClick: handleLinkClick,
        children: /* @__PURE__ */ jsxs("strong", { children: [
          " ",
          item.label,
          " "
        ] })
      }
    ) }, `${item}-${index2}`)) })
  ] });
}
const github = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2032%2032'%20width='32'%20height='32'%20fill='rgba(70,%20128,%20180,1)'%3e%3cpath%20d='M12.001%202C6.47598%202%202.00098%206.475%202.00098%2012C2.00098%2016.425%204.86348%2020.1625%208.83848%2021.4875C9.33848%2021.575%209.52598%2021.275%209.52598%2021.0125C9.52598%2020.775%209.51348%2019.9875%209.51348%2019.15C7.00098%2019.6125%206.35098%2018.5375%206.15098%2017.975C6.03848%2017.6875%205.55098%2016.8%205.12598%2016.5625C4.77598%2016.375%204.27598%2015.9125%205.11348%2015.9C5.90098%2015.8875%206.46348%2016.625%206.65098%2016.925C7.55098%2018.4375%208.98848%2018.0125%209.56348%2017.75C9.65098%2017.1%209.91348%2016.6625%2010.201%2016.4125C7.97598%2016.1625%205.65098%2015.3%205.65098%2011.475C5.65098%2010.3875%206.03848%209.4875%206.67598%208.7875C6.57598%208.5375%206.22598%207.5125%206.77598%206.1375C6.77598%206.1375%207.61348%205.875%209.52598%207.1625C10.326%206.9375%2011.176%206.825%2012.026%206.825C12.876%206.825%2013.726%206.9375%2014.526%207.1625C16.4385%205.8625%2017.276%206.1375%2017.276%206.1375C17.826%207.5125%2017.476%208.5375%2017.376%208.7875C18.0135%209.4875%2018.401%2010.375%2018.401%2011.475C18.401%2015.3125%2016.0635%2016.1625%2013.8385%2016.4125C14.201%2016.725%2014.5135%2017.325%2014.5135%2018.2625C14.5135%2019.6%2014.501%2020.675%2014.501%2021.0125C14.501%2021.275%2014.6885%2021.5875%2015.1885%2021.4875C19.259%2020.1133%2021.9999%2016.2963%2022.001%2012C22.001%206.475%2017.526%202%2012.001%202Z'%3e%3c/path%3e%3c/svg%3e";
const linkedin = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2032%2032'%20width='32'%20height='32'%20fill='rgba(70,%20128,%20180,1)'%3e%3cpath%20d='M18.3362%2018.339H15.6707V14.1622C15.6707%2013.1662%2015.6505%2011.8845%2014.2817%2011.8845C12.892%2011.8845%2012.6797%2012.9683%2012.6797%2014.0887V18.339H10.0142V9.75H12.5747V10.9207H12.6092C12.967%2010.2457%2013.837%209.53325%2015.1367%209.53325C17.8375%209.53325%2018.337%2011.3108%2018.337%2013.6245V18.339H18.3362ZM7.00373%208.57475C6.14573%208.57475%205.45648%207.88025%205.45648%207.026C5.45648%206.1725%206.14648%205.47875%207.00373%205.47875C7.85873%205.47875%208.55173%206.1725%208.55173%207.026C8.55173%207.88025%207.85798%208.57475%207.00373%208.57475ZM8.34023%2018.339H5.66723V9.75H8.34023V18.339ZM19.6697%203H4.32923C3.59498%203%203.00098%203.5805%203.00098%204.29675V19.7033C3.00098%2020.4202%203.59498%2021%204.32923%2021H19.6675C20.401%2021%2021.001%2020.4202%2021.001%2019.7033V4.29675C21.001%203.5805%2020.401%203%2019.6675%203H19.6697Z'%3e%3c/path%3e%3c/svg%3e";
function about$1() {
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col min-h-screen bg-primary overflow-hidden", children: [
    /* @__PURE__ */ jsxs("head", { children: [
      /* @__PURE__ */ jsx("meta", { charSet: "utf-8" }),
      /* @__PURE__ */ jsx("title", { children: "About" }),
      /* @__PURE__ */ jsx("meta", { name: "description", content: "About" }),
      /* @__PURE__ */ jsx("link", { rel: "canonical", href: "https://sivasan29.com/about" }),
      /* @__PURE__ */ jsx("meta", { "http-equiv": "Content-Security-Policy", content: " default-src 'self'; script-src 'self'; style-src 'self' ; img-src 'self' data:; font-src 'self'; connect-src 'self'; object-src 'self'; base-uri 'self'; frame-ancestors 'none';upgrade-insecure-requests;block-all-mixed-content;" })
    ] }),
    /* @__PURE__ */ jsx("h3", { className: "text-3xl md:text-4xl text-white font-bold text-center font-custom2", children: "About" }),
    /* @__PURE__ */ jsxs("main", { className: "flex-grow flex flex-col items-center justify-center px-4 py-8", children: [
      /* @__PURE__ */ jsxs("section", { className: "max-w-2xl mb-8", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-4xl font-bold text-white mb-4 font-custom2", children: "Education" }),
        /* @__PURE__ */ jsx("p", { className: "text-base text-white mb-6 font-custom2", children: "I'm a recent graduate from the University of Illinois Springfield, where I earned my master’s degree in Computer Science in December 2023. Before that, I completed my studies at the University of North Carolina Wilmington, graduating with a bachelor’s degree in Information Technology in December 2020. Throughout my academic journey, I built a solid foundation in computer science principles, algorithms, software engineering, and web development. I had the opportunity to work on a variety of compelling projects, igniting my passion for creating innovative solutions." })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "max-w-2xl mb-8", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-4xl font-bold text-white mb-4 font-custom2", children: "Work Experience" }),
        /* @__PURE__ */ jsxs("p", { className: "text-base text-white mb-6 font-custom2", children: [
          "I've spent a year working as a Software Engineer at ",
          /* @__PURE__ */ jsx("span", { className: "font-bold", children: "Up Cancer" }),
          ", a nonprofit organization. Here I've had the opportunity to:"
        ] }),
        /* @__PURE__ */ jsxs("ul", { className: "list-disc list-inside text-base text-white mb-6 font-custom2", children: [
          /* @__PURE__ */ jsx("li", { children: "Collaborate with cross-functional teams to develop front-end and back-end solutions." }),
          /* @__PURE__ */ jsx("li", { children: "Crafted comprehensive documentation that greately benefited the organization." }),
          /* @__PURE__ */ jsx("li", { children: "Developed product mockups before developing them." })
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "text-base text-white mb-6 font-custom2", children: [
          "I volunteered as a Web Application Developer at ",
          /* @__PURE__ */ jsx("span", { className: "font-bold", children: "Oppia" }),
          ", a nonprofit dedicated to making education more accessible, where I contributed to the following:"
        ] }),
        /* @__PURE__ */ jsxs("ul", { className: "list-disc list-inside text-base text-white mb-6 font-custom2", children: [
          /* @__PURE__ */ jsx("li", { children: "Excelled in producing comprehensive user documentation, significantly enhancing user experience and support." }),
          /* @__PURE__ */ jsx("li", { children: "Designed and engineered user-centric applications and websites that not only met but exceeded user expectations." }),
          /* @__PURE__ */ jsx("li", { children: "Implemented changes using Python, HTML, JavaScript, and CSS, while utilizing GitHub for version control to ensure collaboration and code integrity." })
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "text-base text-white mb-6 font-custom2", children: [
          "Currently, I am a Coder at ",
          /* @__PURE__ */ jsx("span", { className: "font-bold", children: "Outlier AI " }),
          ", where I focus on training AI modules to enhance accuracy."
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "max-w-2xl mb-8", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-4xl font-bold text-white mb-4 font-custom1", children: "Hobbies" }),
        /* @__PURE__ */ jsx("p", { className: "text-base text-white mb-6 font-custom2", children: "Outside of coding, I have a passion for fixing computers and playing video games, activities that not only spark my creativity but also enhance my problem-solving abilities. I also enjoy contributing to open-source projects on GitHub and keeping up to date with the latest technology trends. I believe that exploring diverse interests greatly enriches my skill set and perspective in the tech landscape." })
      ] })
    ] }),
    /* @__PURE__ */ jsx("footer", { className: "bg-primary text-white py-6 text-center", children: /* @__PURE__ */ jsxs("p", { className: "flex justify-center items-center space-x-8 mb-0", children: [
      /* @__PURE__ */ jsxs("span", { className: "text-sm font-custom2", children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " Siva Sankar "
      ] }),
      /* @__PURE__ */ jsx("span", { className: "mx-2", children: /* @__PURE__ */ jsx(
        "a",
        {
          href: "https://github.com/Sadasiva20?tab=repositories",
          target: "_blank",
          rel: "noopener noreferrer",
          className: "text-white hover:text-blue-500",
          children: /* @__PURE__ */ jsx(
            "img",
            {
              src: github,
              alt: "GitHub",
              className: "w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 transition-transform transform hover:scale-125"
            }
          )
        }
      ) }),
      /* @__PURE__ */ jsx("span", { className: "mx-2", children: /* @__PURE__ */ jsx(
        "a",
        {
          href: "https://www.linkedin.com/in/ssank31/",
          target: "_blank",
          rel: "noopener noreferrer",
          className: "text-white hover:text-blue-500",
          children: /* @__PURE__ */ jsx(
            "img",
            {
              src: linkedin,
              alt: "LinkedIn",
              className: "w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 transition-transform transform hover:scale-125"
            }
          )
        }
      ) })
    ] }) })
  ] });
}
const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    message: ""
  });
  const [errors, setErrors] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (value.trim() !== "") {
      setErrors((prev) => ({ ...prev, [name]: void 0 }));
    }
  };
  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstname.trim()) {
      newErrors.firstname = "First name is required";
    }
    if (!formData.lastname.trim()) {
      newErrors.lastname = "Last name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }
    return newErrors;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    const sanitizedData = {
      ...formData,
      message: DOMPurify.sanitize(formData.message)
    };
    try {
      const response = await emailjs.send(
        "service_129dhn3",
        "template_0dy8viu",
        {
          firstname: sanitizedData.firstname,
          lastname: sanitizedData.lastname,
          email: sanitizedData.email,
          message: sanitizedData.message
        },
        "xS1v-SnFrKn76m9-j"
      );
      alert("Message sent successfully!");
      setFormData({ firstname: "", lastname: "", email: "", message: "" });
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message. Please try again.");
    }
  };
  const handleClear = () => {
    setFormData({ firstname: "", lastname: "", email: "", message: "" });
    setErrors({});
  };
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col min-h-screen bg-primary overflow-hidden", children: [
    /* @__PURE__ */ jsx("meta", { charSet: "utf-8" }),
    /* @__PURE__ */ jsx("h1", { className: "text-3xl md:text-4xl text-white font-bold text-center", children: "Contact" }),
    /* @__PURE__ */ jsx("meta", { name: "description", content: "Contact me" }),
    /* @__PURE__ */ jsx("meta", { name: "keyword", content: "Reach out, firstname, lastname, email, message" }),
    /* @__PURE__ */ jsx("meta", { "http-equiv": "Content-Security-Policy", content: " default-src 'self'; script-src 'self'; style-src 'self' ; img-src 'self' data:; font-src 'self'; connect-src 'self'; object-src 'self'; base-uri 'self'; frame-ancestors 'none';upgrade-insecure-requests;block-all-mixed-content;" }),
    /* @__PURE__ */ jsx("link", { rel: "canonical", href: "https://sivasan29.com/contact" }),
    /* @__PURE__ */ jsx("main", { className: "flex-grow flex flex-col items-center justify-center px-4 py-8", children: /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center w-full px-4", children: /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-6 p-8 bg-contact rounded-lg shadow-lg w-full max-w-2xl", children: /* @__PURE__ */ jsx(
      Form,
      {
        className: "w-full",
        validationBehavior: "native",
        validationErrors: errors,
        onReset: () => setFormData({ firstname: "", lastname: "", email: "", message: "" }),
        onSubmit: handleSubmit,
        children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-6 w-full", children: [
          /* @__PURE__ */ jsx("div", { className: "w-full", children: /* @__PURE__ */ jsx(
            Input,
            {
              isRequired: true,
              errorMessage: ({ validationDetails }) => {
                if (validationDetails.valueMissing) {
                  return "First name is required";
                }
                return errors.firstname;
              },
              label: "First Name",
              name: "firstname",
              value: formData.firstname,
              onChange: handleChange,
              placeholder: "Enter your first name",
              className: `w-full font-bold text-lg text-black ${errors.message ? "border-red-600" : ""}`
            }
          ) }),
          /* @__PURE__ */ jsx("div", { className: "w-full", children: /* @__PURE__ */ jsx(
            Input,
            {
              isRequired: true,
              errorMessage: ({ validationDetails }) => {
                if (validationDetails.valueMissing) {
                  return "Last name is required";
                }
                return errors.lastname;
              },
              label: "Last Name",
              name: "lastname",
              value: formData.lastname,
              onChange: handleChange,
              placeholder: "Enter your last name",
              className: `w-full font-bold text-lg text-black ${errors.message ? "border-red-600" : ""}`
            }
          ) }),
          /* @__PURE__ */ jsx("div", { className: "w-full", children: /* @__PURE__ */ jsx(
            Input,
            {
              isRequired: true,
              errorMessage: ({ validationDetails }) => {
                if (validationDetails.valueMissing) {
                  return "Please enter your email";
                }
                if (validationDetails.typeMismatch) {
                  return "Please enter a valid email address";
                }
                return errors.email;
              },
              label: "Email",
              name: "email",
              value: formData.email,
              onChange: handleChange,
              placeholder: "Enter your email",
              type: "email",
              className: `w-full font-bold text-lg text-black ${errors.message ? "border-red-600" : ""}`
            }
          ) }),
          /* @__PURE__ */ jsx("div", { className: "w-full", children: /* @__PURE__ */ jsx(
            Textarea,
            {
              isRequired: true,
              errorMessage: ({ validationDetails }) => {
                if (validationDetails.valueMissing) {
                  return "Message is required";
                }
                return errors.message;
              },
              label: "Message",
              name: "message",
              value: formData.message,
              onChange: handleChange,
              placeholder: "Enter your message",
              className: `w-full font-bold text-lg text-black ${errors.message ? "border-red-600" : ""}`
            }
          ) }),
          /* @__PURE__ */ jsxs(ButtonGroup, { className: "mt-4 flex flex-col gap-2 w-full", children: [
            /* @__PURE__ */ jsx(Button, { className: "w-full text-lg", color: "primary", type: "submit", children: "Send" }),
            /* @__PURE__ */ jsx(Button, { className: "w-full text-lg", color: "default", type: "reset", onClick: handleClear, children: "Clear" })
          ] })
        ] })
      }
    ) }) }) }),
    /* @__PURE__ */ jsx("footer", { className: "bg-primary text-white py-6 text-center", children: /* @__PURE__ */ jsxs("p", { className: "flex justify-center items-center space-x-8 mb-0", children: [
      /* @__PURE__ */ jsxs("span", { className: "text-lg font-custom2", children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " Siva Sankar"
      ] }),
      /* @__PURE__ */ jsx("span", { className: "mx-2", children: /* @__PURE__ */ jsx("a", { href: "https://github.com/Sadasiva20?tab=repositories", target: "_blank", rel: "noopener noreferrer", className: "text-white hover:text-blue-500", children: /* @__PURE__ */ jsx("img", { src: github, alt: "GitHub", className: "w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 transition-transform transform hover:scale-125" }) }) }),
      /* @__PURE__ */ jsx("span", { className: "mx-2", children: /* @__PURE__ */ jsx("a", { href: "https://www.linkedin.com/in/ssank31/", target: "_blank", rel: "noopener noreferrer", className: "text-white hover:text-blue-500", children: /* @__PURE__ */ jsx("img", { src: linkedin, alt: "LinkedIn", className: "w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 transition-transform transform hover:scale-125" }) }) })
    ] }) })
  ] });
};
const picture = "/assets/Picture3-Cv0roTbN.png";
function Home() {
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col min-h-screen bg-primary overflow-hidden", children: [
    /* @__PURE__ */ jsxs("head", { children: [
      /* @__PURE__ */ jsx("meta", { charSet: "utf-8" }),
      /* @__PURE__ */ jsx("title", { children: "Home" }),
      /* @__PURE__ */ jsx("meta", { name: "description", content: "Home" }),
      /* @__PURE__ */ jsx("meta", { name: "keyword", content: "Introduction, Interests and Occupation " }),
      /* @__PURE__ */ jsx("link", { rel: "canonical", href: "https://sivasan29.com/home" }),
      /* @__PURE__ */ jsx("meta", { "http-equiv": "Content-Security-Policy", content: " default-src 'self'; script-src 'self'; style-src 'self' ; img-src 'self' data:; font-src 'self'; connect-src 'self'; object-src 'self'; base-uri 'self'; frame-ancestors 'none';upgrade-insecure-requests;block-all-mixed-content;" })
    ] }),
    /* @__PURE__ */ jsx("main", { className: "bg-primary text-white flex-grow flex flex-col items-center justify-center px-4 py-8 font-sans  ", children: /* @__PURE__ */ jsxs("section", { className: "max-w-2xl text-center mb-8", children: [
      /* @__PURE__ */ jsx("div", { className: "flex justify-center items-center ", children: /* @__PURE__ */ jsx("img", { src: picture, alt: "Picture of me." }) }),
      /* @__PURE__ */ jsx("h3", { className: "text-lg mt-2 text-center font-bold font-custom2", children: " Welcome! I’m Siva Sankar, a Software Engineer " }),
      /* @__PURE__ */ jsx("p", { className: "text-base mb-6 leading-relaxed font-custom2", children: "I have a passion for creating dynamic web applications and tackling complex challenges with innovative technology solutions. This portfolio showcases my professional journey, featuring my experience, projects, and personal interests. I invite you to explore my work and discover how I can contribute to your business success." }),
      /* @__PURE__ */ jsx("a", { href: "/experience", children: /* @__PURE__ */ jsx("button", { className: "bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-lg", children: "View My Projects" }) })
    ] }) }),
    /* @__PURE__ */ jsx("footer", { className: "bg-primary text-white py-6 text-center", children: /* @__PURE__ */ jsxs("p", { className: "flex justify-center items-center space-x-8 mb-0", children: [
      /* @__PURE__ */ jsxs("span", { className: "text-sm font-custom2", children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " Siva Sankar"
      ] }),
      /* @__PURE__ */ jsx("span", { className: "mx-2", children: /* @__PURE__ */ jsx(
        "a",
        {
          href: "https://github.com/Sadasiva20?tab=repositories",
          target: "_blank",
          rel: "noopener noreferrer",
          className: "text-white hover:text-blue-500",
          children: /* @__PURE__ */ jsx(
            "img",
            {
              src: github,
              alt: "GitHub",
              className: "w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 transition-transform transform hover:scale-125"
            }
          )
        }
      ) }),
      /* @__PURE__ */ jsx("span", { className: "mx-2", children: /* @__PURE__ */ jsx(
        "a",
        {
          href: "https://www.linkedin.com/in/ssank31/",
          target: "_blank",
          rel: "noopener noreferrer",
          className: "text-white hover:text-blue-500",
          children: /* @__PURE__ */ jsx(
            "img",
            {
              src: linkedin,
              alt: "LinkedIn",
              className: "w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 transition-transform transform hover:scale-125"
            }
          )
        }
      ) })
    ] }) })
  ] });
}
const UpCancer = "/assets/UpCancer-CkcVI4HT.jpg";
const Jpass = "/assets/Jpass-BdZ8R_OO.jpg";
const todolist = "/assets/todolist-CDoHz_Cx.png";
const NGame = "/assets/NGame-safm5MaT.jpg";
const Oppia = "/assets/oppia-D7jQ4PQ8.jpg";
const cardData = [
  {
    id: 1,
    src: UpCancer,
    title: "Up Cancer",
    details: "Technologies: React, node.js , Dynamodb, JavaScript",
    description: "A comprehensive showcase of my projects, demonstrating both frontend and backend development solutions.",
    link: "https://github.com/Sadasiva20/Up-Cancer-Workspace",
    linktitle: "Github link"
  },
  {
    id: 2,
    src: Oppia,
    title: "Oppia",
    details: "Technologies: Python, CSS, HTML, JavaScript",
    description: "A showcase of my projects, highlighting front-end and back-end development along with relevant documentation.",
    link: "https://github.com/Sadasiva20/oppia/tree/develop",
    linktitle: "Github link"
  },
  { id: 3, src: todolist, title: "TaskNest", details: "Technologies: React, node.js, JavaScript, Remix ", description: "To do List app that allows users to add and delete tasks.", link: "https://github.com/Sadasiva20/Todolist", linktitle: "Github link" },
  {
    id: 4,
    src: Jpass,
    title: "JPass",
    details: "Technologies: Java ",
    description: "A Password Manager app that allows users to generate secure passwords by defining their length.",
    link: "https://github.com/Sadasiva20/PasswordGenerator",
    linktitle: "Github link"
  },
  {
    id: 5,
    src: NGame,
    title: "GuessIt!",
    details: "Technologies: Java",
    description: "A Java-based Number Guessing game where users try to guess a number across four escalating difficulty levels.",
    link: "https://github.com/Sadasiva20/NGuess",
    linktitle: "Github link"
  }
];
function Experience() {
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col min-h-screen bg-primary overflow-hidden", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-3xl md:text-4xl font-bold text-white text-center font-custom2", children: "Experience" }),
    /* @__PURE__ */ jsx("main", { className: "flex-grow flex flex-col items-center justify-center px-4 py-8", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6", children: [
      cardData.map((card) => /* @__PURE__ */ jsxs(Card, { className: "w-full max-w-[520px] border-none transition-transform transform hover:scale-105 relative bg-transparent", children: [
        /* @__PURE__ */ jsxs(CardBody, { className: "flex flex-row flex-wrap p-0 sm:flex-nowrap bg-transparent", children: [
          /* @__PURE__ */ jsx(
            Image,
            {
              removeWrapper: true,
              alt: card.title,
              className: "h-auto w-full flex-none object-cover object-top md:w-48",
              src: card.src
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "px-4 py-5 bg-transparent", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-custom2 text-white", children: card.title }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1 pt-2 text-sm text-default-400 font-custom2", children: [
              /* @__PURE__ */ jsx("p", { children: card.details }),
              /* @__PURE__ */ jsx("p", { children: card.description })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx(CardFooter, { className: "absolute bottom-0 right-0 w-auto flex justify-end p-4 bg-transparent z-10", children: /* @__PURE__ */ jsx(
          Button,
          {
            variant: "flat",
            color: "default",
            radius: "lg",
            size: "sm",
            onClick: () => window.open(card.link, "_blank"),
            className: "text-sm text-white bg-blue-600 opacity-100 hover:bg-blue-700",
            children: card.linktitle
          }
        ) })
      ] }, card.id)),
      /* @__PURE__ */ jsx("div", { className: "col-span-1 sm:col-span-2 mt-4 flex justify-start", children: /* @__PURE__ */ jsx("a", { href: "https://drive.google.com/uc?export=download&id=1lI6aejYHkD-QhnIqIaKkWw8VWiINw52b", children: /* @__PURE__ */ jsx("button", { className: "bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-lg w-full sm:w-auto", children: "Resume" }) }) })
    ] }) }),
    /* @__PURE__ */ jsx("footer", { className: "bg-primary text-white py-6 text-center", children: /* @__PURE__ */ jsxs("p", { className: "flex justify-center items-center space-x-8 mb-0", children: [
      /* @__PURE__ */ jsxs("span", { className: "text-lg font-custom2", children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " Siva Sankar"
      ] }),
      /* @__PURE__ */ jsx("span", { className: "mx-2", children: /* @__PURE__ */ jsx(
        "a",
        {
          href: "https://github.com/Sadasiva20?tab=repositories",
          target: "_blank",
          rel: "noopener noreferrer",
          className: "text-white hover:text-blue-500",
          children: /* @__PURE__ */ jsx(
            "img",
            {
              src: github,
              alt: "GitHub",
              className: "w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 transition-transform transform hover:scale-125"
            }
          )
        }
      ) }),
      /* @__PURE__ */ jsx("span", { className: "mx-2", children: /* @__PURE__ */ jsx(
        "a",
        {
          href: "https://www.linkedin.com/in/ssank31/",
          target: "_blank",
          rel: "noopener noreferrer",
          className: "text-white hover:text-blue-500",
          children: /* @__PURE__ */ jsx(
            "img",
            {
              src: linkedin,
              alt: "LinkedIn",
              className: "w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 transition-transform transform hover:scale-125"
            }
          )
        }
      ) })
    ] }) })
  ] });
}
const links = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous"
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
  }
];
function Layout({ children }) {
  return /* @__PURE__ */ jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxs("head", { children: [
      /* @__PURE__ */ jsx("meta", { charSet: "utf-8" }),
      /* @__PURE__ */ jsx("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }),
      /* @__PURE__ */ jsx(Meta, {}),
      /* @__PURE__ */ jsx(Links, {})
    ] }),
    /* @__PURE__ */ jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsx(ScrollRestoration, {}),
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
function App() {
  const location = useLocation();
  useEffect(() => {
    const scrollToSection = () => {
      const path = location.pathname;
      let targetSection;
      if (path === "/") {
        document.title = "Home";
        targetSection = document.getElementById("home");
      } else if (path === "/about") {
        document.title = "About";
        targetSection = document.getElementById("about");
      } else if (path === "/experience") {
        document.title = "Experience";
        targetSection = document.getElementById("experience");
      } else if (path === "/contact") {
        document.title = "Contact";
        targetSection = document.getElementById("contact");
      }
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
        setTimeout(() => {
          const offset = 65;
          const sectionPosition = targetSection.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({
            top: sectionPosition - offset,
            behavior: "smooth"
          });
        }, 0);
      }
    };
    scrollToSection();
  }, [location]);
  return /* @__PURE__ */ jsx(NextUIProvider, { children: /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(nav, {}),
    /* @__PURE__ */ jsxs("main", { children: [
      /* @__PURE__ */ jsx(ScrollRestoration, {}),
      /* @__PURE__ */ jsx(Scripts, {}),
      /* @__PURE__ */ jsx(LiveReload, {}),
      /* @__PURE__ */ jsx("div", { id: "home", className: "section", children: /* @__PURE__ */ jsx(Home, {}) }),
      /* @__PURE__ */ jsx("div", { id: "about", className: "section", children: /* @__PURE__ */ jsx(about$1, {}) }),
      /* @__PURE__ */ jsx("div", { id: "experience", className: "section", children: /* @__PURE__ */ jsx(Experience, {}) }),
      /* @__PURE__ */ jsx("div", { id: "contact", className: "section", children: /* @__PURE__ */ jsx(ContactForm, {}) })
    ] }),
    /* @__PURE__ */ jsx("footer", {})
  ] }) });
}
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Layout,
  default: App,
  links
}, Symbol.toStringTag, { value: "Module" }));
function work() {
  return /* @__PURE__ */ jsxs("html", { children: [
    /* @__PURE__ */ jsx(nav, {}),
    /* @__PURE__ */ jsx(Experience, {})
  ] });
}
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: work
}, Symbol.toStringTag, { value: "Module" }));
function contact() {
  return /* @__PURE__ */ jsxs("html", { children: [
    /* @__PURE__ */ jsx(nav, {}),
    /* @__PURE__ */ jsx(ContactForm, {})
  ] });
}
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: contact
}, Symbol.toStringTag, { value: "Module" }));
function index() {
  return /* @__PURE__ */ jsxs("html", { children: [
    /* @__PURE__ */ jsx(nav, {}),
    /* @__PURE__ */ jsx(Home, {})
  ] });
}
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: index
}, Symbol.toStringTag, { value: "Module" }));
function about() {
  return /* @__PURE__ */ jsxs("html", { children: [
    /* @__PURE__ */ jsx(nav, {}),
    /* @__PURE__ */ jsx(about$1, {})
  ] });
}
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: about
}, Symbol.toStringTag, { value: "Module" }));
function home() {
  return /* @__PURE__ */ jsxs("html", { children: [
    /* @__PURE__ */ jsx(nav, {}),
    /* @__PURE__ */ jsx(Home, {})
  ] });
}
const route5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: home
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-C7iqkMJF.js", "imports": ["/assets/index-DrmYegOL.js", "/assets/components-BkFyVmph.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/root-DVKpOAJ-.js", "imports": ["/assets/index-DrmYegOL.js", "/assets/components-BkFyVmph.js", "/assets/linkedin-CDjofyt7.js", "/assets/about-CDpWLNqV.js", "/assets/contact-CRDxSL-C.js", "/assets/home-VUe2UPFX.js", "/assets/experience-C6Vktjpw.js", "/assets/GlobalConfig-BfVCAYU5.js", "/assets/chunk-DBLREEYE-Bsf-I9Ht.js"], "css": ["/assets/root-B1pnQab6.css"] }, "routes/experience": { "id": "routes/experience", "parentId": "root", "path": "experience", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/experience-Bv8jVlsh.js", "imports": ["/assets/index-DrmYegOL.js", "/assets/linkedin-CDjofyt7.js", "/assets/experience-C6Vktjpw.js", "/assets/chunk-DBLREEYE-Bsf-I9Ht.js"], "css": [] }, "routes/contact": { "id": "routes/contact", "parentId": "root", "path": "contact", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/contact-fjPDLotH.js", "imports": ["/assets/index-DrmYegOL.js", "/assets/linkedin-CDjofyt7.js", "/assets/contact-CRDxSL-C.js", "/assets/chunk-DBLREEYE-Bsf-I9Ht.js"], "css": [] }, "routes/_index": { "id": "routes/_index", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_index-qfg9n3yD.js", "imports": ["/assets/index-DrmYegOL.js", "/assets/linkedin-CDjofyt7.js", "/assets/home-VUe2UPFX.js"], "css": [] }, "routes/about": { "id": "routes/about", "parentId": "root", "path": "about", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/about-B7O3bQyc.js", "imports": ["/assets/index-DrmYegOL.js", "/assets/linkedin-CDjofyt7.js", "/assets/about-CDpWLNqV.js"], "css": [] }, "routes/home": { "id": "routes/home", "parentId": "root", "path": "home", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/home-CFP3a5XR.js", "imports": ["/assets/index-DrmYegOL.js", "/assets/linkedin-CDjofyt7.js", "/assets/home-VUe2UPFX.js"], "css": [] } }, "url": "/assets/manifest-d74ab21d.js", "version": "d74ab21d" };
const mode = "production";
const assetsBuildDirectory = "build\\client";
const basename = "/";
const future = { "v3_fetcherPersist": true, "v3_relativeSplatPath": true, "v3_throwAbortReason": true, "v3_routeConfig": false, "v3_singleFetch": false, "v3_lazyRouteDiscovery": false, "unstable_optimizeDeps": false };
const isSpaMode = false;
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/experience": {
    id: "routes/experience",
    parentId: "root",
    path: "experience",
    index: void 0,
    caseSensitive: void 0,
    module: route1
  },
  "routes/contact": {
    id: "routes/contact",
    parentId: "root",
    path: "contact",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route3
  },
  "routes/about": {
    id: "routes/about",
    parentId: "root",
    path: "about",
    index: void 0,
    caseSensitive: void 0,
    module: route4
  },
  "routes/home": {
    id: "routes/home",
    parentId: "root",
    path: "home",
    index: void 0,
    caseSensitive: void 0,
    module: route5
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  mode,
  publicPath,
  routes
};
