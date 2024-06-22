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
              {xpData.map((xp) => {
                const totalXPRequired = xp.next_level_xp - xp.level_xp;
                const currentXpProgress = xp.xp - xp.level_xp;

                const progressPercentage =
                  Number(currentXpProgress / totalXPRequired) * 100;

                return (
                  <div className="col" key={xp.name}>
                    <div className="d-flex justify-content-center w-100">
                      <span
                          className="form-label main-text-color badge rounded-pill text-bg-primary"
                      >
                      {xp.name}
                    </span>
                    </div>
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
                      <label className="form-label main-text-color">
                        Level Xp:
                      </label>
                      <div className="progress ">
                        <div
                          className="progress-bar"
                          role="progressbar"
                          style={{ width: progressPercentage + "%" }}
                          aria-valuenow={xp.level}
                          aria-valuemin="0"
                          aria-valuemax={totalXPRequired}
                        >
                          {progressPercentage.toFixed(0)}%
                        </div>
                      </div>
                    </div>

                    <hr />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default XpComponent;
