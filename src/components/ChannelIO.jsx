import { useEffect } from "react";

const ChannelIO = () => {
  useEffect(() => {
    // 채널IO 스크립트를 로드하는 함수
    const loadChannelIO = () => {
      if (window.ChannelIO) {
        return window.console.error("ChannelIO script included twice.");
      }
      const ch = function() {
        ch.c(arguments);
      };
      ch.q = [];
      ch.c = function(args) {
        ch.q.push(args);
      };
      window.ChannelIO = ch;

      const script = document.createElement("script");
      script.type = "text/javascript";
      script.async = true;
      script.src = "https://cdn.channel.io/plugin/ch-plugin-web.js";
      script.onload = () => {
        window.ChannelIO("boot", {
          pluginKey: "4e9a3725-f5da-47cd-a39f-dba5136632fb"
        });
      };
      document.getElementsByTagName("head")[0].appendChild(script);
    };

    if (document.readyState === "complete") {
      loadChannelIO();
    } else {
      window.addEventListener("DOMContentLoaded", loadChannelIO);
      window.addEventListener("load", loadChannelIO);
    }

    return () => {
      // clean up the script if necessary
      const scripts = document.querySelectorAll('script[src="https://cdn.channel.io/plugin/ch-plugin-web.js"]');
      scripts.forEach(script => script.remove());
    };
  }, []);

  return null; // 이 컴포넌트는 UI를 렌더링하지 않음
};

export default ChannelIO;