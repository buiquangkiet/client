import {
    BsTelephoneFill,
    BsHeadphones,
    BsPinterest,
    BsChevronDown,
    BsStarHalf,
    BsStar,
    BsStarFill,
    BsCheckLg,
} from "react-icons/bs";
import { HiMail, HiLocationMarker } from "react-icons/hi";
import {
    AiOutlineHeart,
    AiFillShopping,
    AiOutlineUnorderedList,
    AiOutlinePrinter,
    AiOutlineCamera,
    AiOutlineLaptop,
    AiOutlineEye,
    AiOutlineTwitter,
    AiOutlineGooglePlus,
    AiOutlineUser,
    AiOutlineFilter,
    AiOutlineClose,
    AiOutlineDelete,
    AiOutlineDashboard,
    AiOutlineShopping,
    AiOutlineSearch,
    AiOutlineEdit,
    AiOutlineCheckSquare,
} from "react-icons/ai";
import { FiSmartphone, FiTablet, FiUsers } from "react-icons/fi";
import { CiSpeaker } from "react-icons/ci";
import { SlScreenDesktop } from "react-icons/sl";
import { GrFormPrevious, GrFormNext, GrFormPreviousLink } from "react-icons/gr";
import { VscThreeBars } from "react-icons/vsc";
import { FaFacebookF, FaGift, FaShieldAlt } from "react-icons/fa";
import { BiHide, BiShow } from "react-icons/bi";
import { MdLocalShipping, MdOutlineCreateNewFolder } from "react-icons/md";
import { GiReturnArrow, GiRotaryPhone } from "react-icons/gi";
import { RiAuctionLine, RiProductHuntLine } from "react-icons/ri";
import { GoTriangleDown, GoTriangleUp } from 'react-icons/go';
import { IoIosLogOut } from 'react-icons/io';
import { RxDashboard } from 'react-icons/rx'
export const PhoneIcon = BsTelephoneFill;
export const MailIcon = HiMail;
export const HeartIcon = AiOutlineHeart;
export const ShopIcon = AiOutlineShopping;
export const ListIcon = AiOutlineUnorderedList;
export const SmartphoneIcon = FiSmartphone;
export const TableIcon = FiTablet;
export const LaptopIcon = AiOutlineLaptop;
export const SpeakerIcon = CiSpeaker;
export const TvIcon = SlScreenDesktop;
export const PrinterIcon = AiOutlinePrinter;
export const CameraIcon = AiOutlineCamera;
export const HeadphonesIcon = BsHeadphones;
export const NextIcon = GrFormNext;
export const PrevIcon = GrFormPrevious;
export const EyeIcon = AiOutlineEye;
export const ThreelineIcon = VscThreeBars;
export const StarOutlineIcon = BsStar;
export const StarFillIcon = BsStarFill;
export const HalfStar = BsStarHalf;
export const LocationIcon = HiLocationMarker;
export const FbIcon = FaFacebookF;
export const TwitterIcon = AiOutlineTwitter;
export const PinterestIcon = BsPinterest;
export const GoogleIcon = AiOutlineGooglePlus;
export const HidePasswordIcon = BiHide;
export const ShowPasswordIcon = BiShow;
export const PrevArrowIcon = GrFormPreviousLink;
export const UserIcon = AiOutlineUser;
export const ShieldIcon = FaShieldAlt;
export const ShippingIcon = MdLocalShipping;
export const GiftIcon = FaGift;
export const ReturnArrowIcon = GiReturnArrow;
export const TelephoneIcon = GiRotaryPhone;
export const DownArrowIcon = BsChevronDown;
export const FilterIcon = AiOutlineFilter;
export const CloseIcon = AiOutlineClose;
export const DeleteIcon = AiOutlineDelete;
export const DashboardIcon = AiOutlineDashboard;
export const UserManagerIcon = FiUsers;
export const CreateProductIcon = MdOutlineCreateNewFolder;
export const ManageProductIcon = RiProductHuntLine;
export const SearchIcon = AiOutlineSearch;
export const EditIcon = AiOutlineEdit;
export const CheckIcon = BsCheckLg;
export const LogoutIcon = IoIosLogOut;
export const DashBoardIcon = RxDashboard;
export const RadioButtonIcon = () => {
    return (<div className="flex flex-col ">
        <GoTriangleUp />
        <GoTriangleDown />
    </div>)
}
export const AuctionIcon = RiAuctionLine