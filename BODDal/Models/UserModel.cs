using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BODDal.Models
{
    public class UserModel
    {
        public Int64? UM_Id { get; set; }
        public int? UserID { get; set; }
        public int? CreatedBy { get; set; }
        public int? UpdatedBy { get; set; }
        public int? UserMainId { get; set; }
        public int? StakeHolderId { get; set; }
        public int? StakeHolderUserId{ get; set; }
        public string StakeHolderFirstName { get; set; }
        public string StakeHolderLastName { get; set; }
        public string UserLoginID { get; set; }
        public string ChildMenuJsLink { get; set; }
        public string UM_FirstName { get; set; }
        public string UM_LastName { get; set; }
        public int? UM_MainID { get; set; }
        public bool IsDeleted { get; set; }

        public int? UM_BranchId { get; set; }

        public string UM_CurrentPassword { get; set; }
        public string UM_NewPassword { get; set; }
        public string UM_ConfirmPassword { get; set; }

        public string Password { get; set; }
        public string UM_Password { get; set; }
        public string UM_Login { get; set; }
        public int? CompanyID { get; set; }
        public int? FyId { get; set; }
        public string UserName { get; set; }
        public string UM_Address { get; set; }
        public string UM_ContactNo { get; set; }
        public string UM_EmailId { get; set; }
        public int UM_Active { get; set; }
        public int UM_EM_Id { get; set; }
        public string Em_EmpName { get; set; }
        public int UM_DM_Id { get; set; }
        public string CompanyName { get; set; }
        public string[] CompanyNameList { get; set; }
        public string CM_Name { get; set; }
        public int Module { get; set; }
        public int SelectedModule { get; set; }
        public string UM_Role { get; set; }
        public string UM_SubRole { get; set; }
        public int? UM_SubRoleId { get; set; }
        public string UM_EmailVery { get; set; }
        public string UM_CmnyPrefix { get; set; }
        public string UM_CmnyPrefixForStakeholder { get; set; }
        public string UM_CompanyPicForStakeholder { get; set; }

        public string UM_PrimaryIdType { get; set; }
        public string UM_PrimaryIdNumber { get; set; }

        public string ENR_Logo { get; set; }
        public string ENR_CompanyLogo { get; set; }

        public string UM_ProfilePic { get; set; }
        public string UM_CompanyPic { get; set; }
        public string UM_Prefix { get; set; }
        public int? ENR_Id { get; set; }
        public string TransactionType { get; set; }
        public int? UM_ParentId { get; set; }
        public string Role { get; set; }
        public string Param { get; set; }
        public string paramValue { get; set; }
        public string StoreProcedure { get; set; }
        public int? UM_Status { get; set; }
        public int? BA_Id { get; set; }
        public int? Assessment_Id { get; set; }
        public string UM_Gender { get; set; }
        public string UM_Age { get; set; }
        public string SMSGateWay { get; set; }
        public string EmailVeried { get; set; }

        //********   UserChat  ********

        public Int64? UC_Id { get; set; }
        public int? UC_UserId { get; set; }
        public DateTime UC_DateTime { get; set; }
        public string UC_File { get; set; }
        public int? UC_UCC_Id { get; set; }
        public string UC_Msg { get; set; }

        //********   UserState  ********
        public Int64? US_Id { get; set; }
        public int? US_UserId { get; set; }
        public string US_Availability { get; set; }

        //********   UserChatCreation  ********
      //  public int? UCC_Id { get; set; }
        public int? UCC_CreatedId { get; set; }
        public int? UCC_ChatReciver { get; set; }
        public bool UCC_IsClear { get; set; }


        public string ThemeColor { get; set; }
        public string ThemeStyle { get; set; }
        public string TheamLink { get; set; }
        public string CoreLink { get; set; }
        public string CustomCSSLink { get; set; }

        public UserModel()
        {
            submenuList = new List<SubMenu>();
            mainmenuList = new List<Menu>();
            mainmenuLst = new List<MainMenu>();
        }
        public List<SubMenu> submenuList { get; set; }
        public List<MainMenu> mainmenuLst { get; set; }
        public List<Menu> mainmenuList { get; set; }

    }
}