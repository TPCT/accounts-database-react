import React from "react";

const XpComponent = ({ xpData }) => {
  return (
    <div className="accordion accordion-flush" id="accordionFlushExample">
      <div className="accordion-item">
        <h2 className="accordion-header" id="flush-headingOne">
          <button
            className="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#flush-collapseOne"
            aria-expanded="false"
            aria-controls="flush-collapseOne"
          >
            XP
          </button>
        </h2>
        <div
          id="flush-collapseOne"
          className="accordion-collapse collapse"
          aria-labelledby="flush-headingOne"
          data-bs-parent="#accordionFlushExample"
        >
          <div className="accordion-body">
            <div className="mb-3 row row-cols-1 row-cols-md-2">
              {xpData.map((xp) => (
                <div className="col" key={xp.name}>
                  <label
                    htmlFor={xp.name}
                    className="form-label main-text-color"
                  >
                    Name:
                  </label>
                  <input
                    type="text"
                    value={xp.name}
                    disabled
                    className="form-control"
                    id={xp.name}
                  />
                  <label
                    htmlFor={xp.level}
                    className="form-label main-text-color my-4 pe-2"
                  >
                    Level:
                  </label>
                  <span className="badge rounded-pill secondary">
                    {xp.level}
                  </span>

                  <div className="">
                    <label className="form-label main-text-color">Level:</label>
                    <div className="progress ">
                      <div
                        className="progress-bar"
                        role="progressbar"
                        style={{ width: xp.level + "%" }}
                        aria-valuenow={xp.level}
                        aria-valuemin="0"
                        aria-valuemax="80"
                      >
                        {xp.level}%
                      </div>
                    </div>
                  </div>

                  {/* <input
                    type="text"
                    value={xp.level_xp}
                    disabled
                    className="form-control"
                    id={xp.level_xp}
                  /> */}

                  <hr />
                </div>
                // <div key={item.name}>
                //   {Object.entries(item).map(([key, value]) => (
                //     <>
                //       <label htmlFor="exampleFormControlInput1" className="form-label">
                //         {key}
                //       </label>
                //       <input
                //         type="email"
                //         value={value}
                //         className="form-control"
                //         id="exampleFormControlInput1"
                //         placeholder="name@example.com"
                //       />
                //     </>
                //   ))}
                // </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default XpComponent;