import React from "react";

const PwdRequist = ({
  capsLetterFlag,
  numberFlag,
  pwdLentghFlag,
  specalCharFlag,
}) => {
  return (
    <div className="PassWordsRules">
      <p className={capsLetterFlag}>Must contain 1 Capital Letter</p>
      <p className={numberFlag}>Must contain a number</p>
      <p className={pwdLentghFlag}>Must be 8 Chars long</p>
      <p className={specalCharFlag}>Must contain specal charact</p>
    </div>
  );
};

export default PwdRequist;
