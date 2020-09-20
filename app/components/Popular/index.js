import React, { useState, useEffect } from "react";
import { fetchPopularRepos } from "../../utils/api";
import Loading from "../Loading";
import LanguagesNavigation from "../LanguagesNavigation";
import ReposGrid from "../ReposGrid";
import LANGUAGES from "../../constants/languages";

export default function Popular({ repos, updateRepos }) {
  const DEFAULT_LANGUAGE = LANGUAGES[0];
  const [selectedLanguage, setSelectedLanguage] = useState(DEFAULT_LANGUAGE.en);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checker = {
      isCurrent: true
    };

    updateLanguage(selectedLanguage, checker);

    return () => {
      checker.isCurrent = false;
    };
  }, []);

  function updateLanguage(selectedLanguage, checker) {
    setSelectedLanguage(selectedLanguage);
    setError(null);

    fetchPopularRepos(selectedLanguage)
      .then((data) => {
        if (!checker.isCurrent) return;

        updateRepos({
          ...repos,
          [selectedLanguage]: data,
        });
      })
      .catch(() => {
        console.warn("요청 오류: ", error);

        setError({
          error: "저장소 정보를 가져오는데 실패하였습니다.",
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

      {error && <p className="center-text error">에러났숑: {error.message}</p>}

      {repos[selectedLanguage] && <ReposGrid repos={repos[selectedLanguage]} />}
    </>
  );
}
