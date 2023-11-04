
import { Bookmark } from "./icons/Bookmark";
import { DM } from "./icons/DM";
import { Comment } from "./icons/Comment";
import { Heart } from "./icons/Heart";
import { Menu } from "./icons/Menu";


/**
 * User
 * {
 *   id: string;
 *   name: string;
 *   profileImg: string;
 * }
 */
/**
 * Comment
 * {
 *   id: string;
 *   text: string
 *   author: User
 * }
 */
/**
 * Content
 * {
 *   id: string;
 *   author: User;
 *   location: string;
 *   image: string;
 *   text: string;
 *   liked: User[]
 *    comments:
 * }
 */


//어떤 데이터가 필요한지 생각하고
//위와 같이 객체를 먼저 구상한다.


export const Feed = ({
  loggedInUser,
  content,
  onUpdateContents,
  onAddComment, 
}) => {
  const [commentInputVisible, setCommentInputVisible] = useState(false);
  const backgroundImage =
    content.author.profileImg ||
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
  const likedContent = (content.liked || []).some(
    (id) => loggedInUser.id === id
  );
  const updateHeartButtonClick = async () => {
    const nextLiked = likedContent
      ? arrayRemove(loggedInUser.id)
      : arrayUnion(loggedInUser.id);
    await updateDoc(doc(firestore, "feeds", content.id), {
      liked: nextLiked,
    });
    const nextContent = {
      ...content,
      liked: likedContent
        ? content.liked.filter((id) => id !== loggedInUser.id)
        : [...content.liked, loggedInUser.id],
    };
    onUpdateContents(nextContent);
  };

  return (
    <div className="border-2 w-[400px] bg-white">
      <div id="header" className="flex items-center justify-between p-2">
        {/* profile */}
        <div className="flex items-center">
          <div
            className="rounded-full w-10 h-10
           bg-[url('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png')]
           bg-contain mr-2"
          />
          <div>
            <div className="font-semibold">{content.author.name}</div>
            <div className="font-light">{content.location}</div>
          </div>
        </div>
        {/* 더보기 버튼 */}
        <div>
          <Menu />
        </div>
      </div>
      <div id="content" className="w-[400px] h-[400px]">
        <img
          onDoubleClick={updateHeartButtonClick}
          className="object-cover	w-[400px] h-[400px]"
          src={content.image}
          alt="img"
        />
      </div>
      <div id="footer" className="flex items-center justify-between p-2">
        <div className="inner-left flex items-center justify-between w-24">
          <button onClick={updateHeartButtonClick}>
            <Heart color={likedContent ? "red" : null} />
          </button>
          
          <button onClick={() => setCommentInputVisible(!commentInputVisible)}>
            <Comment />
          </button>  
          <DM />
        </div>
        <div className="inner-right items-center">
            <div>
                <Bookmark />
            </div>
        </div>
        {/** 좋아요버튼, 댓글버튼, DM버튼 */}
        {/** 저장 버튼 */}
      </div>
      <div id="comments" className="p-2">
       
        {/* 누가 좋아요했는지 + 좋아요한 사람의 수 */}
        <div>
          Liked by <b>{content.liked.length} others</b>
        </div>
        <div>
          <b>{content.author.name}</b> {content.text}
        </div>
        {/* 내가 작성한 컨텐츠의 글 */}
        {/* 댓글들 */}
      </div>
    </div>
  );
};