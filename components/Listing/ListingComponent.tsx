import {
  MediaRenderer,
  useNetwork,
  useNetworkMismatch,
  useListing,
  useContract,
  useActiveListings,
} from "@thirdweb-dev/react";
import {
  ChainId,
  ListingType,
  Marketplace,
  NATIVE_TOKENS,
} from "@thirdweb-dev/sdk";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { marketplaceContractAddress } from "../../addresses";
import styles from "../../styles/Home.module.css";
import profile from "../../assets/PROFILE.png";
import Image from "next/image";
import Link from "next/link";
import PlaceBidModal from "./PlaceBidModal";
import EnlargeNFTModal from "./EnlargeNFTModal";
import { ethers } from "ethers"
import { ContractAbi, ContractAddress } from "../utils/constants";
import { fetchListing } from "../utils/utils";


const ListingComponent: any = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [listing, setListing] = useState<any>(null);
  const [loadingListing, setloadingListing] = useState<boolean>(true);
  const [bids, setBids] = useState<any>([]);
  const [modalOpenEnlargeNFT, setModalOpenEnlargeNFT] =
    useState<boolean>(false);

  // Next JS Router hook to redirect to other pages and to grab the query from the URL (listingId)
  const router = useRouter();

  // De-construct listingId out of the router.query.
  // This means that if the user visits /listing/0 then the listingId will be 0.
  // If the user visits /listing/1 then the listingId will be 1.
  const { listingId } = router.query as { listingId: string };



  const fetchlisting = async () => {
    const provider = new ethers.providers.Web3Provider(
      window.ethereum as any
    );

    if (listingId) {
      await window?.ethereum?.request({ method: "eth_requestAccounts" });
      const signer = provider.getSigner();

      const contract = new ethers.Contract(ContractAddress, ContractAbi, signer);
      const id = Number(listingId);
      const listingTx = await contract.fetchNFT(id);
      // console.log(listingTx)
      const res = await fetchListing({ contract, listingTx });
      // Get the latest block number
      const toBlock = await provider.getBlockNumber();
      const fromBlock = 0;

      // Subscribe to the 'Bid' event
      contract.queryFilter(contract.filters.Bid(), fromBlock, toBlock)
        .then((events) => {
          setBids((prevBids :any) => {
            return events.slice(0, 4).map((event : any) => {
              const { sender, amount } = event?.args;
              const formattedAmount = Number(amount) / 1e18;
              return { sender, amount: formattedAmount };
            });
          });
        })
      setListing(res);
      setloadingListing(false);
      //  setLoadingListings(false);
      //  console.log(res);
      //  setMenuItems(res);
    }
  }
  useEffect(() => {
    if (typeof window !== "undefined") {
      fetchlisting();
    }
  }, []);

  // Store the bid amount the user entered into the bidding textbox
  const [bidAmount, setBidAmount] = useState<string>("");

  if (loadingListing) {
    return (
      <div className={`font-ibmPlex ${styles.loadingOrError}`}>Loading...</div>
    );
  }

  if (!listing) {
    return (
      <div className={`font-ibmPlex ${styles.loadingOrError}`}>
        Listing not found
      </div>
    );
  }

  async function createBidOrOffer() {
    try {
      // bidAmount // The offer amount the user entered
      if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(
          window.ethereum as any
        );

        if (listingId) {
          await window?.ethereum?.request({ method: "eth_requestAccounts" });
          const signer = provider.getSigner();
          const contract = new ethers.Contract(ContractAddress, ContractAbi, signer);
          const id = Number(listingId);
          const valueToSend = ethers.utils.parseEther(bidAmount); // Example: sending 1 Ether

          // Call the contract method with value
          const listingTx = await contract.bid(id, { value: valueToSend });
          isModalClosed();
        }
      }
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }
  async function makeOffer() {
    try {
      // bidAmount // The offer amount the user entered
      if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(
          window.ethereum as any
        );

        if (listingId) {
          await window?.ethereum?.request({ method: "eth_requestAccounts" });
          const signer = provider.getSigner();
          const contract = new ethers.Contract(ContractAddress, ContractAbi, signer);
          const id = Number(listingId);
          const valueToSend = ethers.utils.parseEther(bidAmount); // Example: sending 1 Ether

          // Call the contract method with value
          const listingTx = await contract.makeOffer(id, { value: valueToSend });
          isModalClosed();
        }
      }
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  // Modal Place Bid
  const isModalOpen = () => {
    setModalOpen(true);
  };
  const isModalClosed = () => {
    setModalOpen(false);
  };

  // Modal Enlarge NFT
  const isModalOpenEnlargeNFT = () => {
    setModalOpenEnlargeNFT(true);
  };
  const isModalClosedEnlargeNFT = () => {
    setModalOpenEnlargeNFT(false);
  };

  if (listing) {
    return (
      <>
        <div className="flex flex-col realtive h-full items-center container lg:w-[98dvw]  mt-[6.5rem]  overflow-x-hidden justify-between">
          <div className="flex justify-center realtive w-3/4">
            <div className="absolute translate-x-[100%] lg:translate-x-1 lg:right-[70%] xl:translate-x-0 xl:right-1/2  left-0 hidden md:block ">
              <Link
                href="/"
                className="font-ibmPlex cursor-pointer uppercase font-bold text-green text-xs -z-10"
              >
                {"<<<"} Back
              </Link>
            </div>
            <div className="flex flex-col h-full items-center justify-center">
              <div className="w-full lg:w-max">
                <div className=" min-w-[350px]  lg:max-w-[50vw] cursor-pointer">
                  <Image
                    src={listing?.image as string}
                    alt={listing?.title as string}
                    width={400}
                    height={600}
                    className="w-full mb-2 object-contain cursor-pointer"
                    onClick={isModalOpenEnlargeNFT}
                  />{" "}
                  <div className="flex flex-col font-ibmPlex mb-4 uppercase text-xs text-[#e4e8eb] ">
                    <div className=" flex ">
                      <div className="">
                        <p>{listing?.title}</p>
                      </div>
                      <div className="flex grow"></div>
                      <div className=" flex text-left">
                        {" "}
                        <p className="pr-6 ">
                          Reserve <br /> Price
                        </p>
                        <p className="font-bold ">
                          {listing.price} <br /> ETH
                        </p>
                      </div>
                    </div>

                    <div className=" flex mt-3">
                      <div className="font-bold flex">
                        <b>
                          {/* {listing.seller?.slice(0, 6) +
                            "..." +
                            listing.seller?.slice(36, 40)} */}
                        </b>
                      </div>

                      <div className="flex grow"></div>
                      <div className=" flex text-left">
                        {" "}
                        <p className="pr-6 ">
                          Current <br /> Bid
                        </p>
                        <p className="font-bold text-green">
                          {listing.Bid}  <br /> ETH
                        </p>
                      </div>
                    </div>
                    <div className=" flex mt-3">
                      <div className="flex grow"></div>
                      <div className=" flex font-bold text-green">
                        {
                          listing.timeElapse ?
                            <>
                              <p className="pr-5">
                                ENDS IN</p> <p> {listing?.time}</p>
                            </> :
                            <p className="pr-5">
                              {
                                listing.endTime != 0 ?
                                  listing.endTime
                                  :
                                  "place bid"
                              }
                            </p>
                        }

                      </div>
                      <div className="flex grow"></div>
                    </div>
                  </div>
                </div>
                <div className="font-ibmPlex w-full md:min-w-1 flex items-center justify-between">
                  <button
                    className=" text-green font-xCompressed  w-full border border-green uppercase tracking-[8px] py-1 bg-white bg-opacity-20 hover:bg-opacity-30 font-semibold text-xl  "
                    onClick={isModalOpen}
                  >
                    Make Payment
                  </button>
                </div>
              </div>
              <div className="font-ibmPlex bold text-center w-full   mt-10 pb-10 border-b leading-5 text-xs">
                <p className="md:w-[50vw]">
                  {listing?.description}
                </p>
              </div>
              <div className="flex w-full mt-6 mb-10 font-ibmPlex text-xs">
                <div className="flex flex-1/2 flex-col w-1/2 items-start">
                  <button className="text-green mb-4">
                    SHARE AND EARN 1% {">>"}
                  </button>
                  <button className="mb-4">VIEW ON ETHERSCAN {">"}</button>
                  <button className="mb-4">VIEW METADATA {">"}</button>
                  <button className="mb-4">VIEW ON IPFS {">"}</button>
                </div>
                <div className="flex-1/2  w-1/2">
                  <p className="text-left mb-2">HISTORY</p>
                  {
                    bids.length > 0 &&
                    bids.map((bid: any,key:number) => (
                      <div className="flex  justify-between text-left mt-2">
                        <Image
                          src={profile}
                          width={30}
                          height={10}
                          alt="profile picture"
                          className="hidden md:block h-fit"
                          key={key}
                        />

                        <>
                          <p className="md:pl-4 w-1/2 md:w-full">
                            Bid placed by <span className="font-bold">
                              @{bid.sender?.slice(0, 6) +
                                "..." +
                                bid.sender?.slice(36, 40)}
                            </span>{" "}
                            {/* <br /> Jan 15, 2023 at 7.31pm */}
                          </p>
                          <div className="flex flex-grow"></div>
                          <p className="font-bold text-green">
                            {bid.amount} <br /> ETH
                          </p>
                        </>
                      </div>
                    ))
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
        <PlaceBidModal
          bidAmount={bidAmount}
          setBidAmount={setBidAmount}
          listing={listing}
          isModalClosed={isModalClosed}
          modalOpen={modalOpen}
          createBidOrOffer={createBidOrOffer}
          makeOffer={makeOffer}
        />
        <EnlargeNFTModal
          isModalClosedEnlargeNFT={isModalClosedEnlargeNFT}
          modalOpenEnlargeNFT={modalOpenEnlargeNFT}
          listing={listing}
        />
      </>
    );
  }
};

export default ListingComponent;
