import { useContext, useEffect, useRef, useState } from "react";
import { API } from "./api";
import { ActionTypes, Crud } from "./constants";
import { ErrorContext } from "../../wrappers/ErrorBoundary";

const { IDLE, PENDING, REJECT, FULFILLED } = ActionTypes;

export const useFetch = (endpoint, params, method = Crud.GET) => {
  const status = useRef(IDLE);
  const apiError = useRef();

  const [data, setData] = useState([]);

  const { setError } = useContext(ErrorContext);

  useEffect(() => {
    const abortController = new AbortController();
    (async () => {
      setData([]);
      status.current = PENDING;
      try {
        const response = await API.call(
          method,
          endpoint,
          params,
          abortController.signal
        );
        status.current = FULFILLED;
        setData(response);
      } catch (e) {
        if (abortController.signal.aborted) {
          return;
        }
        setError(e);
        setData([]);
        status.current = REJECT;
        apiError.current = e;
      }
    })();

    return () => abortController.abort();
  }, [endpoint, method, setError, params]);

  return { data, status: status.current, error: apiError.current };
};
