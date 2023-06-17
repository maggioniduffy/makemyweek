import React from "react";
import LinearProgress from "@mui/material/LinearProgress";
import { CircularProgress } from "@mui/material";

const WhiteSpace = () => <div className="bg-transparent h-full w-full"></div>;

interface GrayProps {
  h?: string;
  o?: string;
}

const GraySpace = ({ h = "14", o = "50" }: GrayProps) => {
  console.log(h);
  return (
    <div className="h-24">
      <div
        className={`bg-gray rounded-lg h-${h} bg-opacity-${o} w-full flex place-items-center justify-center`}
      >
        <span className="h-full p-6" />
      </div>
    </div>
  );
};

const AuxCalendar = () => {
  return (
    <table className="table-fixed bg-white w-10/12 rounded-xl shadow h-full m-48 p-8">
      <thead className="h-12">
        <tr>
          <th></th>
        </tr>
      </thead>
      <tbody className="m-4">
        <tr>
          <td>
            <GraySpace h="12" o="30" />
          </td>
          <td>
            <WhiteSpace />
          </td>
          <td>
            <GraySpace h="18" o="20" />
          </td>
          <td>
            <WhiteSpace />
          </td>
          <td>
            <GraySpace h="20" o="40" />
          </td>
          <td>
            <WhiteSpace />
          </td>
        </tr>
        <tr>
          <td>
            <WhiteSpace />
          </td>
          <td>
            <GraySpace h="24" o="30" />
          </td>
          <td>
            <GraySpace h="20" o="20" />
          </td>
          <td>
            <WhiteSpace />
          </td>
          <td>
            <GraySpace h="16" o="30" />
          </td>
          <td>
            <WhiteSpace />
          </td>
        </tr>
        <tr>
          <td>
            <WhiteSpace />
          </td>
          <td>
            <WhiteSpace />
          </td>
          <td>
            <GraySpace o="20" />
          </td>
          <td>
            <WhiteSpace />
          </td>
          <td>
            <GraySpace h="20" />
          </td>
          <td>
            <WhiteSpace />
          </td>
        </tr>
        <tr>
          <td>
            <WhiteSpace />
          </td>
          <td>
            <WhiteSpace />
          </td>
          <td>
            <GraySpace />
          </td>
          <td>
            <WhiteSpace />
          </td>
          <td>
            <GraySpace h="24" />
          </td>
          <td>
            <WhiteSpace />
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default AuxCalendar;
