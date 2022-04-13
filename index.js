console.log(window.location.pathname)

class HeaderBanner extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `<div class="position-relative">
        <div class="hero-shape"></div>
        <nav class="navbar navbar-expand-lg navbar-light">
            <div class="container py-2">
                <a class="navbar-brand font-weight-bold" href="/"><img src="./img/logo.png" height="65" width="229"></a>
                <button class="navbar-toggler" type="button" data-toggle="collapse"
                    data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav ml-auto">
                        <li class="nav-item active">
                            <a class="nav-link" href="index.html">
                                ${window.location.pathname == '/index.html' ? '<b>Home</b>' : 'Home'}
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="teacher-registration.html">
                                ${window.location.pathname == '/teacher-registration.html' ? '<b>Teacher Signup</b>' : 'Teacher Signup'}
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="about-us.html" role="button" aria-haspopup="true"
                            aria-expanded="false"> 
                                ${window.location.pathname == '/about-us.html' ? '<b>About us</b>' : 'About us'}
                        </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="contact-us.html">
                                ${window.location.pathname == '/contact-us.html' ? '<b>Contact Us</b>' : 'Contact Us'}
                            </a>
                        </li>
    
                    </ul>
                    <div class="ml-lg-5">
                        <a class="btn btn-success" href="teacher.html">My Tutors</a>
                    </div>
                </div>
            </div>
        </nav>
        <div class="banner-bg pb-5 pt-md-5 position-relative">
            <div class="container pb-5 pt-md-5 rw-col">
                <img src="img/9-SCENE.svg" alt="Image" height="450 class="img-fluid rounded">
                <div class="row py-5 justify-content-between align-items-center">
                    <div class="col-lg-12 col-md-12 py-5">
                        <h1 class="font-weight-bold display-5 mb-4">
                            Our tutors offers face-to-face and online tuition.
                        </h1>
                        <p class="lead mb-5">
                            Our focus - modular training programs from leading practice
                            lectors.
                        </p>
                        <a  href="contact-us.html"class="btn btn-success">Contact Us &rarr; </a>
                    </div>
                </div>
            </div>
        </div>
    </div>`;
    }
}


class FooterComponent extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `<div class="bg-light">
        <div class="container py-5">
            <div class="row pt-5">
                <div class="col-md-6 col-lg-3 mb-5">
                <a class="navbar-brand font-weight-bold" href="/"><img src="./img/logo-footer.png" height="65" width="229"></a>
                    <p class="semi-bold"> The best way to learn from a Tutor. </p>
                    <div class="social-icons mt-4"> <a href="#"><i class="lni lni-facebook-filled"></i></a> <a
                            href="#"><i class="lni lni-twitter-filled"></i></a> <a href="#"><i
                                class="lni lni-instagram-filled"></i></a> <a href="#"><i
                                class="lni lni-github-original"></i></a> </div>
                </div>
                <div class="col-md-6 col-lg-3 mb-5">
                    <h6 class="mb-4 font-weight-bold">Group Name</h6>
                    <ul class="list-unstyled bb m-0">
                        <li><a href="">The Landers</a></li>
                    </ul>
                </div>
                <div class="col-md-6 col-lg-3 mb-5">
                    <h6 class="mb-4 font-weight-bold">Group Member</h6>
                    <ul class="list-unstyled bb m-0">
                        <li><a href="">Muskan Jeryal</a></li>
                        <li><a href="">Loveneet Kaur</a></li>
                        <li><a href="">Devinderpal Singh</a></li>
                        <li><a href="">Sukhpal Singh</a></li>
                        <li><a href="">Deekshay Sethi</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>`
    }
}

customElements.define("head-banner", HeaderBanner);
customElements.define("footer-component", FooterComponent);



function showTeacher(subject) {
    window.open(`/teacher.html?subject=${subject}`, `_self`)
}
