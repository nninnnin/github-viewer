import React, { Fragment, useState, useEffect } from "react";
import { fetchPopularRepos } from "../../utils/api";
import Loading from "../Loading";
import LanguagesNavigation from "../LanguagesNavigation";
import ReposGrid from "../ReposGrid";

export default function Popular() {
  const [selectedLanguage, setSelectedLanguages] = useState("ALL");
  const [repos, setRepos] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    updateLanguage(selectedLanguage);
  }, []);

  function updateLanguage(selectedLanguage) {
    setSelectedLanguages(selectedLanguage);
    setError(null);

    if (!repos[selectedLanguage]) {
      fetchPopularRepos(selectedLanguage)
        .then((data) => {
          setRepos({
            ...repos,
            [selectedLanguage]: data,
          });
        })
        .catch(() => {
          console.warn("Error fetching repos: ", error);

          setError({
            error: "There was an error fetching the repositories.",
          });
        });
    }
  }

  function isLoading() {
    return !repos[selectedLanguage] && error === null;
  }

  return (
    <Fragment>
      <LanguagesNavigation
        selected={selectedLanguage}
        onUpdateLanguage={updateLanguage}
      />

      {isLoading() && <Loading text="Fetching" />}

      {error && <p className="center-text error">{error}</p>}

      {repos[selectedLanguage] && <ReposGrid repos={repos[selectedLanguage]} />}
    </Fragment>
  );
}
