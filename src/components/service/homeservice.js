import Link from "next/link";

const HomeService = () => {
  return (
    <div className="container">
      <section className="service border-section small-section">
        <div className="row">
          {/* Skin-Friendly Formula */}
          <div className="col-md-3 service-block">
            <div className="media">
              <div className="media-body">
                <h4>Skin-Friendly Formula</h4>
                <p>No irritation, gentle on skin.</p>
              </div>
            </div>
          </div>

          {/* Long-Lasting Protection */}
          <div className="col-md-3 service-block">
            <div className="media">
              <div className="media-body">
                <h4>Long-Lasting Protection</h4>
                <p>All-day freshness.</p>
              </div>
            </div>
          </div>

          {/* Natural Ingredients */}
          <div className="col-md-3 service-block">
            <div className="media">
              <div className="media-body">
                <h4>Natural Ingredients</h4>
                <p>No artificial chemicals.</p>
              </div>
            </div>
          </div>

          {/* No Stains or Residue */}
          <div className="col-md-3 service-block">
            <div className="media">
              <div className="media-body">
                <h4>No Stains or Residue</h4>
                <p>Won’t mark clothing.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeService;
