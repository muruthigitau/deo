import Link from "next/link";

const NotFound = () => {
  return (
    <>
      <div className="breadcrumb-section">
        <div className="container">
          <h2>404 page</h2>
          <nav className="theme-breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link href="/">
                  <span>Home</span>
                </Link>
              </li>
              <li className="breadcrumb-item active">404 page</li>
            </ol>
          </nav>
        </div>
      </div>

      <section className="p-0">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <div className="error-section">
                <h1>404</h1>
                <h2>Page Not Found</h2>
                <Link href="/" className="btn btn-solid">
                  <span>Back to Home</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default NotFound;
