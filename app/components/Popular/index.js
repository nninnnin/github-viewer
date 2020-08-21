import React, { useState, useEffect } from "react";
import { fetchPopularRepos } from "../../utils/api";
import Loading from "../Loading";
import LanguagesNavigation from "../LanguagesNavigation";
import ReposGrid from "../ReposGrid";
import LANGUAGES from "../../constants/languages";

export default function Popular() {
  const [selectedLanguage, setSelectedLanguage] = useState(LANGUAGES[0]);
  const [repos, setRepos] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    updateLanguage(selectedLanguage);
  }, []);

  function updateLanguage(selectedLanguage) {
    setSelectedLanguage(selectedLanguage);
    setError(null);

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

  function isLoading() {
    return !repos[selectedLanguage] && error === null;
  }

  return (
    <>
      <LanguagesNavigation
        selected={selectedLanguage}
        onUpdateLanguage={updateLanguage}
      />

      {isLoading() && <Loading text="가져오는 중입니다" />}

      {error && <p className="center-text error">{error}</p>}

      {repos[selectedLanguage] && <ReposGrid repos={repos[selectedLanguage]} />}
    </>
  );
}
